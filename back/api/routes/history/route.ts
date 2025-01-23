import { Request, Response } from 'express';
import { RequestInterfaceBody, RequestInterfaceParams, RequestInterfaceQuery, ResponseInterface } from './interfaces';

export default async (
    req: Request<RequestInterfaceParams, any, RequestInterfaceBody, RequestInterfaceQuery>,
    res: Response<ResponseInterface>,
): Promise<Response<ResponseInterface>> => {
    const {
        query: { sortBy, sortOrder, page, limit },
    } = req;


};
