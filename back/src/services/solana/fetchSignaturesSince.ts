import {connection} from "./connection";
import {PublicKey} from "@solana/web3.js";

export const fetchSignaturesSince = async ({
    programId,
    limit = 10_000,
    cutoffTimeSec
}: {
    programId: PublicKey;
    cutoffTimeSec: number;
    limit?: number;
}) => {
    if (!connection) {
        return false;
    }

    let allSignatures = [];
    let beforeSig = undefined;

    while (true) {
        const sigInfos = await connection.getSignaturesForAddress(programId, {
            before: beforeSig,
            limit
        });

        if (sigInfos.length === 0) {
            break;
        }

        const validSigInfos = sigInfos.filter(
            (info) => (info.blockTime || 0) >= cutoffTimeSec
        );

        allSignatures.push(...validSigInfos);

        if (validSigInfos.length < sigInfos.length) {
            break;
        }

        beforeSig = sigInfos[sigInfos.length - 1].signature;
    }

    return allSignatures;
}
