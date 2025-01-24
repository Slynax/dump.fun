import { Keypair } from '@solana/web3.js';

export const generateWallet = () => {
    const keypair = Keypair.generate();
    return {
        publicKey: keypair.publicKey,
        secretKey: keypair.secretKey
    }
}