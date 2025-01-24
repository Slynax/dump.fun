import { Request, Response } from 'express';
import { RequestInterfaceBody, RequestInterfaceParams, RequestInterfaceQuery, ResponseInterface } from './interfaces';
import { restoreWallet } from '../../../helpers/restoreWallet';
import { getWalletBalance } from "../../../helpers/getWalletBalance";

export default async (
    req: Request<RequestInterfaceParams, any, RequestInterfaceBody, RequestInterfaceQuery>,
    res: Response<ResponseInterface>,
): Promise<Response<ResponseInterface>> => {

    const { privateKey } = req.body;

    const keypair = restoreWallet(privateKey);

    if (!keypair) {
        return res.status(500);
    }

    const balance = await getWalletBalance(keypair);

    if (!balance && balance !== 0) {
        return res.status(500);
    }

    return res.send({
        publicKey: keypair.publicKey.toBase58(),
        balance,
    });
};
