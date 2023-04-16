import { NextFunction, Request, Response } from 'express';

type RequestMethod = 'GET' | 'POST'

type expressCallback = (req: Request, res: Response) => void;

type expressMiddleware = (req: Request, res: Response, next: NextFunction) => void;

interface Binding {
    method: RequestMethod;
    path: string;
    callback: expressCallback;
    middleware?: expressMiddleware | expressMiddleware[];
}

export { type RequestMethod, type expressCallback, type expressMiddleware, type Binding };
