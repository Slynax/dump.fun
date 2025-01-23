import {fetchSignaturesSince} from "./fetchSignaturesSince";
import {buildTransactionData} from "../../helpers/buildTransactionsData";
import {buildCandles} from "../../helpers/buildCandles";

import {
    PublicKey,
} from '@solana/web3.js';

export const getTransactionHistory = async ({
    programId
}: {
    programId: string;
}) => {
    const PROGRAM_ID = new PublicKey(programId);

    const now = Date.now();
    const cutoffTimeSec = Math.floor(now / 1000) - 24 * 60 * 60;

    const signatures = await fetchSignaturesSince({programId: PROGRAM_ID, cutoffTimeSec});

    if (!signatures) {
        return false;
    }

    const txDataArray = await buildTransactionData({signatures});

    if (!txDataArray) {
        return false;
    }

    return buildCandles({txDataArray});
}
