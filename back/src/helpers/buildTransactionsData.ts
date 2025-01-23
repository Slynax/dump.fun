import {connection} from "../services/solana/connection";
import {TransactionSignature} from "@solana/web3.js";

export const buildTransactionData = async ({ signatures }: { signatures: Array<{ signature: string; blockTime: number }> }): Promise<Array<any> | false> => {
    if (!connection) {
        return false;
    }

    const txDataArray = [];

    const chunkSize = 50;
    for (let i = 0; i < signatures.length; i += chunkSize) {
        const chunk = signatures.slice(i, i + chunkSize);
        const txs = await connection.getTransactions(
            chunk.map((info) => info.signature),
            { maxSupportedTransactionVersion: 0 }
        );

        txs.forEach((parsedTx, index) => {
            if (!parsedTx) return;
            const blockTime = parsedTx.blockTime;
            if (!blockTime) return;

            let value = 0;
            try {
                const meta = parsedTx.meta;
                if (meta && meta.postBalances && meta.preBalances) {
                    const lamportsChange = meta.postBalances[0] - meta.preBalances[0];
                    value = lamportsChange;
                }
            } catch (err) {
            }

            txDataArray.push({
                timestamp: blockTime,
                value
            });
        });
    }

    txDataArray.sort((a, b) => a.timestamp - b.timestamp);
    return txDataArray;
}
