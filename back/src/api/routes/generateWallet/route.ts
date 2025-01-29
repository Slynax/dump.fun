import { Request, Response } from 'express';
import { RequestInterfaceBody, RequestInterfaceParams, RequestInterfaceQuery, ResponseInterface } from './interfaces';
import { generateWallet } from '../../../helpers/generateWallet';
import { getWalletBalance } from "../../../helpers/getWalletBalance";
import bs58 from "bs58";

export default async (
    req: Request<RequestInterfaceParams, any, RequestInterfaceBody, RequestInterfaceQuery>,
    res: Response<ResponseInterface>,
): Promise<Response<ResponseInterface>> => {

    console.log("rentre api");
    const keypair = generateWallet();

    if (!keypair) {
        return res.status(500);
    }


    const balance  = await getWalletBalance(keypair);

    if (!balance && balance !== 0) {
        return res.status(500);
    }

    console.log("publicKey : ", keypair.publicKey.toBase58());
    console.log("secretKey : ", bs58.encode(keypair.secretKey));

    return res.send({
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey),
        balance,
    });
};
