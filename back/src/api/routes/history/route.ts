import { Request, Response } from 'express';
import { RequestInterfaceBody, RequestInterfaceParams, RequestInterfaceQuery, ResponseInterface } from './interfaces';
import {getTransactionHistory} from "../../../services/solana/getTransactionHistory";

export default async (
    req: Request<RequestInterfaceParams, any, RequestInterfaceBody, RequestInterfaceQuery>,
    res: Response<ResponseInterface>,
): Promise<Response<ResponseInterface>> => {
    const {
        query: { token },
    } = req;

    const transactionHistory = await getTransactionHistory({
        programId: token
    });

    if (!transactionHistory) {
        return res.status(500);
    }

    return res.send({
        data: transactionHistory
    });
};
