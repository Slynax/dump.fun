import { fetchSignaturesSince } from '../services/solana/fetchSignaturesSince';

import {
    Connection,
    PublicKey
} from '@solana/web3.js';
import {buildTransactionData} from "../helpers/buildTransactionsData";
import {buildCandles} from "../helpers/buildCandles";

/**
 * We’ll mock out the Connection class so we don’t hit real RPC endpoints.
 * Instead, we'll simulate how the methods should behave.
 */
jest.mock('@solana/web3.js', () => {
    // We keep references to the original module so we can still use PublicKey, etc.
    const originalModule = jest.requireActual('@solana/web3.js');

    // Create a mock Connection class
    class MockConnection {
        constructor() {}
        getSignaturesForAddress() {
            // Overridden in tests for custom behavior
        }
        getTransactions() {
            // Overridden in tests for custom behavior
        }
    }

    return {
        ...originalModule,
        Connection: MockConnection
    };
});

describe('fetchSignaturesSince', () => {
    let connection;
    let programId;
    let mockGetSignaturesForAddress;

    beforeEach(() => {
        connection = new Connection();
        programId = new PublicKey('FAKE_PROGRAM_ID');

        mockGetSignaturesForAddress = jest.spyOn(connection, 'getSignaturesForAddress', 'get');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch signatures until older than cutoffTimeSec', async () => {
        // Suppose "now" is 100_000_0000, so cutoff is 99_999_9900 in seconds
        const cutoffTimeSec = 999999900;

        // We simulate 2 pages of data. The first page is all above cutoff,
        // the second page partially below cutoff => we stop.
        mockGetSignaturesForAddress
            .mockResolvedValueOnce([
                // blockTime is in seconds
                { signature: 'SIG_1', blockTime: 999999950 },
                { signature: 'SIG_2', blockTime: 999999905 }
            ])
            .mockResolvedValueOnce([
                // second page has some older than cutoff
                { signature: 'SIG_3', blockTime: 999999899 }, // older => filtered out
                { signature: 'SIG_4', blockTime: 999999890 }  // older => filtered out
            ]);

        const result = await fetchSignaturesSince(connection, programId, cutoffTimeSec);

        expect(result).toHaveLength(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ signature: 'SIG_1', blockTime: 999999950 }),
                expect.objectContaining({ signature: 'SIG_2', blockTime: 999999905 })
            ])
        );

        // We expect getSignaturesForAddress to be called twice
        expect(mockGetSignaturesForAddress).toHaveBeenCalledTimes(2);
    });

    it('should return empty if no signatures found', async () => {
        mockGetSignaturesForAddress.mockResolvedValue([]);
        const cutoffTimeSec = 999999900;

        const result = await fetchSignaturesSince(connection, programId, cutoffTimeSec);
        expect(result).toHaveLength(0);
    });
});

describe('buildTransactionData', () => {
    let connection;
    let mockGetTransactions;

    beforeEach(() => {
        connection = new Connection(); // mocked
        mockGetTransactions = jest.spyOn(connection, 'getTransactions');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should build array of timestamp/value from transaction details', async () => {
        // mock signatures
        const signatures = [
            { signature: 'SIG_A', blockTime: 111111000 },
            { signature: 'SIG_B', blockTime: 111111100 }
        ];

        // Return an array of parsed transactions, in the same order as the signatures
        mockGetTransactions.mockResolvedValueOnce([
            {
                blockTime: 111111000,
                meta: {
                    postBalances: [1010],
                    preBalances: [1000]
                }
            },
            {
                blockTime: 111111100,
                meta: {
                    postBalances: [500],
                    preBalances: [800]
                }
            }
        ]);

        const result = await buildTransactionData(connection, signatures);

        // We expect:
        // - For SIG_A: blockTime=111111000, lamportsChange = +10
        // - For SIG_B: blockTime=111111100, lamportsChange = -300
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            timestamp: 111111000,
            value: 10
        });
        expect(result[1]).toEqual({
            timestamp: 111111100,
            value: -300
        });
    });

    it('should skip null or missing blockTime transactions', async () => {
        const signatures = [
            { signature: 'SIG_C', blockTime: 111111000 },
            { signature: 'SIG_D', blockTime: 111111100 }
        ];

        mockGetTransactions.mockResolvedValueOnce([
            null,
            { meta: { postBalances: [200], preBalances: [150] } }
        ]);

        const result = await buildTransactionData({
            signatures
        });
        expect(result).toHaveLength(0); // second tx has no blockTime => also skipped
    });
});

describe('buildCandles', () => {
    it('should group transactions into hourly candles', () => {
        // We'll create transactions with timestamps in seconds.
        // Example:
        //  - Tx at 3600s => belongs to Candle #1 (starting at 0, covers 0 to 3600)
        //  - Tx at 7200s => belongs to Candle #2 (covers 3600 to 7200)
        // etc.
        const txDataArray = [
            { timestamp: 1000, value: 10 },
            { timestamp: 2000, value: 20 },
            { timestamp: 3500, value: 5 },
            { timestamp: 3600, value: 15 },
            { timestamp: 3700, value: 30 }
        ];

        const hoursPerCandle = 1; // 1-hour candles
        // 1 hour = 3600 seconds

        const candles = buildCandles({txDataArray});
        expect(candles).toHaveLength(2);

        // Candle #1: covers timestamps [0, 3600)
        //  - Txs = 1000 (val=10), 2000(val=20), 3500(val=5)
        //  - open=10, close=5, top=20, bottom=5
        expect(candles[0]).toEqual({
            start: 0,      // 0 * 3600
            top: 20,
            bottom: 5,
            open: 10,
            close: 5
        });

        // Candle #2: covers timestamps [3600, 7200)
        //  - Txs = 3600(val=15), 3700(val=30)
        //  - open=15, close=30, top=30, bottom=15
        expect(candles[1]).toEqual({
            start: 1 * 3600,
            top: 30,
            bottom: 15,
            open: 15,
            close: 30
        });
    });

    it('should handle empty intervals', () => {
        // All tx in the same hour => one candle, plus an empty hour
        // By default in the example code, an empty candle gets open/close/top/bottom=0
        const txDataArray = [
            { timestamp: 100, value: 5 },
            { timestamp: 200, value: 7 }
        ];
        const hoursPerCandle = 1;

        const candles = buildCandles(txDataArray, hoursPerCandle);
        expect(candles).toHaveLength(1);
        // In the default example, it starts from the earliest TX (ts=100 => hourIndex=0)
        // and ends at the last TX (ts=200 => hourIndex=0).
        // So there's only one hour to cover.

        expect(candles[0]).toEqual({
            start: 0,
            top: 7,
            bottom: 5,
            open: 5,
            close: 7
        });
    });
});
