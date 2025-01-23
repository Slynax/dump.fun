import {connection} from "./connection";

import {
    PublicKey
} from '@solana/web3.js';

export const listener = ({ programId }: { programId: string }) => {
    if (!connection) {
        return;
    }

    const PROGRAM_ID = new PublicKey(programId);

    return connection.onLogs(
        PROGRAM_ID,
        (logInfo) => {
            const { signature, logs } = logInfo;
            console.log('--- New Transaction Logs ---');
            console.log('Signature:', signature);
            console.log('Logs:', logs);
            console.log('----------------------------');
        },
        'confirmed'
    );
}
