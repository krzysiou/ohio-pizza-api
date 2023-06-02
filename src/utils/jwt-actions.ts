import { NextFunction, Request, Response } from 'express';
import { User } from '../types';
import { sign, verify } from 'jsonwebtoken';

const generateJsonWebToken = (user: User) => {
  return sign(user, process.env.TOKEN_SECRET as string);
};

const verifyJsonWebToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    req.body.authorizedUser = verify(token, process.env.TOKEN_SECRET as string) as User;
    next();
  } catch {
    res.status(401).send({message: 'Authorization failed'});
  }
};

export { generateJsonWebToken, verifyJsonWebToken };
