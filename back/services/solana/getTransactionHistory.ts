const {
    Connection,
    PublicKey,
    clusterApiUrl
} = require('@solana/web3.js');

/**
 * Configuration
 */
const PROGRAM_ID = new PublicKey('YOUR_PROGRAM_ID_HERE');
const SOLANA_CLUSTER = 'devnet';          // 'devnet', 'testnet', or 'mainnet-beta'
const COMMITMENT = 'confirmed';           // 'processed', 'confirmed', or 'finalized'
const HOURS_PER_CANDLE = 1;               // Group data into 1-hour candles
const MAX_TX_PER_FETCH = 1000;            // Max transactions fetched per RPC call
const MS_PER_HOUR = 60 * 60 * 1000;
const SECONDS_PER_HOUR = 60 * 60;

/**
 * Main function
 */
async function main() {
    const now = Date.now();
    const cutoffTimeSec = Math.floor(now / 1000) - 24 * 60 * 60; // 24 hours ago (in seconds)

    // Create connection
    const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER), COMMITMENT);

    // 1) Fetch signatures from most recent to oldest until we cross the 24h cutoff
    const signatures = await fetchSignaturesSince(connection, PROGRAM_ID, cutoffTimeSec);

    // 2) Fetch full transaction details & build an array of { timestamp, value }
    //    "value" can be something you derive from logs or instructions.
    const txDataArray = await buildTransactionData(connection, signatures);

    // 3) Group by time intervals and produce candlestick data
    const candles = buildCandles(txDataArray, HOURS_PER_CANDLE);

    console.log(`Last 24H Candles (grouped by ${HOURS_PER_CANDLE} hour intervals):`);
    console.log(candles);
}
