import {connection} from "./connection";

const {
    PublicKey
} = require('@solana/web3.js');

export const listener = ({ programId }: { programId: string }) => {
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
