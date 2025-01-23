import {connection} from "../services/solana/connection";
import {TransactionSignature} from "@solana/web3.js";

export const buildTransactionData = async ({ signatures }: { signatures: Array<{ signature: string; blockTime: number }> }) => {
    const txDataArray = [];

    // Batch fetch in small chunks to avoid RPC timeouts or rate limits
    const chunkSize = 50;
    for (let i = 0; i < signatures.length; i += chunkSize) {
        const chunk = signatures.slice(i, i + chunkSize);
        const txs = await connection.getTransactions(
            chunk.map((info) => info.signature),
            { maxSupportedTransactionVersion: 0 }
        );

        // txs can contain null if the transaction is not found
        txs.forEach((parsedTx, index) => {
            if (!parsedTx) return;
            const blockTime = parsedTx.blockTime;
            if (!blockTime) return;

            // Example: We'll pretend "value" is the total lamport transfer from instruction #0
            // In a real use case, parse logs or instructions to derive an actual "price" or "amount".
            let value = 0;
            try {
                // This is just a naive example that tries to read the lamport transfer
                // from the first instruction's postTokenBalances or something similar.
                // Adjust logic to your actual data.
                const meta = parsedTx.meta;
                if (meta && meta.postBalances && meta.preBalances) {
                    // Compare first account's pre/post to see how many lamports were gained or lost.
                    // This is just an example for demonstration.
                    const lamportsChange = meta.postBalances[0] - meta.preBalances[0];
                    value = lamportsChange;
                }
            } catch (err) {
                // If parsing fails, ignore
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
