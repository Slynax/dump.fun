import { generateWallet } from '../src/helpers/generateWallet';
import { restoreWallet } from '../src/helpers/restoreWallet';
import { getWalletBalance } from '../src/helpers/getWalletBalance';
import { PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';
import { connectSolana } from "../src/services/solana/connection";
import { describe, it, expect, beforeAll } from 'vitest';

describe('Wallet test', () => {

    beforeAll(() => {
        connectSolana();
    });

    it('generateWallet should create a new wallet', async () => {
        const wallet = generateWallet();

        expect(wallet).toHaveProperty('publicKey');
        expect(wallet).toHaveProperty('secretKey');

        expect(wallet.publicKey).toBeInstanceOf(PublicKey);
        expect(wallet.secretKey).toBeInstanceOf(Uint8Array);

        const publicKeyBs58 = wallet.publicKey.toBase58();
        expect(publicKeyBs58).toMatch(/^(\w{4,}){3}\w{4}$/);

        const secretKeyBs58 = bs58.encode(wallet.secretKey);
        expect(secretKeyBs58).toMatch(/^(\w{4,}){3}\w{4}$/);

        const balance = await getWalletBalance(wallet);
        expect(balance).toBe(0);
    });

    it('restoreWallet should restore a wallet from a secret key', () => {
        const privateKey = "EdXMLCtQRUdRvC6zgpunQSK4JrV1Gy64H6rMVCZM1L7qTno9Uubw9rfHc2chRs24PaQ34Y2P5ZqaVBS5SxovgW2";
        const restoredWallet = restoreWallet(privateKey);
        expect(restoredWallet).toHaveProperty('publicKey');
        expect(restoredWallet).toHaveProperty('secretKey');
        expect(restoredWallet.publicKey).toBeInstanceOf(PublicKey);
        expect(restoredWallet.secretKey).toBeInstanceOf(Uint8Array);
        const publicKeyBs58 = restoredWallet.publicKey.toBase58();
        expect(publicKeyBs58).toMatch(/^(\w{4,}){3}\w{4}$/);
        const secretKeyBs58 = bs58.encode(restoredWallet.secretKey);
        expect(secretKeyBs58).toMatch(/^(\w{4,}){3}\w{4}$/);
    });

    it('getWalletBalance should return the correct balance', async () => {
        const wallet = generateWallet();
        const balance = await getWalletBalance(wallet);
        expect(balance).toBe(0);
    });

    it('generateWallet should create unique wallets', () => {
        const wallet1 = generateWallet();
        const wallet2 = generateWallet();
        expect(wallet1.publicKey.toBase58()).not.toBe(wallet2.publicKey.toBase58());
        expect(bs58.encode(wallet1.secretKey)).not.toBe(bs58.encode(wallet2.secretKey));
    });

    it('restoreWallet should throw an error for invalid secret key', () => {
        const invalidPrivateKey = "invalidPrivateKey";
        expect(() => restoreWallet(invalidPrivateKey)).toThrow();
    });

    it('restoreWallet should restore a wallet from a secret key', () => {
        const privateKey = "EdXMLCtQRUdRvC6zgpunQSK4JrV1Gy64H6rMVCZM1L7qTno9Uubw9rfHc2chRs24PaQ34Y2P5ZqaVBS5SxovgW2";
        const restoredWallet = restoreWallet(privateKey);
        expect(restoredWallet).toHaveProperty('publicKey');
        expect(restoredWallet).toHaveProperty('secretKey');
        expect(restoredWallet.publicKey).toBeInstanceOf(PublicKey);
        expect(restoredWallet.secretKey).toBeInstanceOf(Uint8Array);
        const publicKeyBs58 = restoredWallet.publicKey.toBase58();
        expect(publicKeyBs58).toMatch(/^(\w{4,}){3}\w{4}$/);
        const secretKeyBs58 = bs58.encode(restoredWallet.secretKey);
        expect(secretKeyBs58).toMatch(/^(\w{4,}){3}\w{4}$/);
    });

});