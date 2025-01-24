export interface TxRecord {
    signature: string;
    mint: string;
    traderPublicKey: string;
    txType: 'buy' | 'sell';
    tokenAmount: number;
    solAmount: number;
    newTokenBalance: number;
    bondingCurveKey: string;
    vTokensInBondingCurve: number;
    vSolInBondingCurve: number;
    marketCapSol: number;
    pool: string;
    /** <-- We'll assume we have a timestamp for the record, in seconds. */
    time: number;
}

/**
 * This is the shape expected by Lightweight Charts
 * (and the Lightweighthart component) for a candlestick.
 */
export interface Candle {
    /** Must be a numeric UNIX timestamp in seconds (lightweight-charts uses `time` as number or string). */
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}


export function computeCandles(records: TxRecord[]): Candle[] {
    const aggregatorPerSecond = records.reduce((aggregator, record) => {
        const timestamp = record.time;
        const second = Math.floor(timestamp / 1000);
        if (!aggregator[second]) {
            aggregator[second] = {
                open: record.solAmount,
                high: record.solAmount,
                low: record.solAmount,
                close: record.solAmount,
            };
        } else {
            const candle = aggregator[second];
            candle.high = Math.max(candle.high, record.solAmount);
            candle.low = Math.min(candle.low, record.solAmount);
            candle.close = record.solAmount;
        }
        return aggregator;
    }, {} as Record<number, { open: number, high: number, low: number, close: number }>);

    return Object.entries(aggregatorPerSecond).map(([time, candle]) => ({
        time: Number(time),
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
    }));
}
