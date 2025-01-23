export const buildCandles = ({txDataArray}: { txDataArray: Array<{ timestamp: number, value: number }> }) => {
    if (txDataArray.length === 0) return [];

    txDataArray.sort((a, b) => a.timestamp - b.timestamp);

    const startTime = txDataArray[0].timestamp;
    const endTime = txDataArray[txDataArray.length - 1].timestamp;

    const startIndex = Math.floor(startTime);
    const endIndex = Math.floor(endTime);

    const candles = [];
    let txIndex = 0;

    for (let c = startIndex; c <= endIndex; c++) {
        const candleStartSec = c;
        const candleEndSec = c + 1;

        let open = null;
        let close = null;
        let top = -Infinity;
        let bottom = Infinity;

        // Process transactions in this candle's time range
        while (
            txIndex < txDataArray.length &&
            txDataArray[txIndex].timestamp >= candleStartSec &&
            txDataArray[txIndex].timestamp < candleEndSec
            ) {
            const { value } = txDataArray[txIndex];
            if (open === null) open = value;
            close = value;
            if (value > top) top = value;
            if (value < bottom) bottom = value;

            txIndex++;
        }

        if (open === null) {
            open = 0;
            close = 0;
            top = 0;
            bottom = 0;
        }

        candles.push({
            start: candleStartSec,
            top,
            bottom,
            open,
            close
        });
    }

    return candles;
}
