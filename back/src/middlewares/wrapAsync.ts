import { NextFunction, Request, Response } from 'express';

export default (asynFunc: (req: Request<any, any, any, any>, res: Response<any>, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        asynFunc(req, res, next).catch(next);
    };
