import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export const restoreWallet = (privateKey: string) => {

    const secretKey = bs58.decode(privateKey);
    const restoredKeypair = Keypair.fromSecretKey(secretKey);

    return {
        publicKey: restoredKeypair.publicKey,
        secretKey: restoredKeypair.secretKey
    };
};