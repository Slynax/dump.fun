import { LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import {connection} from '../services/solana//connection';
export const getWalletBalance = async (keypair:{publicKey:PublicKey,secretKey:Uint8Array}) => {
    const balance = await connection.getBalance(keypair.publicKey);
    return balance / LAMPORTS_PER_SOL;
}