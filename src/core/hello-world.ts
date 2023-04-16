import { NextFunction, Request, Response } from 'express';

const helloWorldMiddleware = (req: Request, res: Response, next:NextFunction) => {
  console.log('/ endpoint is being accessed');
  next();
};

const helloWorld = (req: Request, res: Response) => {
  res.send('Hello World');
};

export { helloWorldMiddleware, helloWorld };
