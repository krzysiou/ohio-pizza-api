import { Request, Response } from 'express';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { findUser, saveUser } from '../utils/user-actions';
import { generateJsonWebToken } from '../utils/jwt-actions';

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const registerEmployee = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if(!username || !password) {
    return res.status(400).send({ message: 'Username or password was not provided' });
  }

  const user = await findUser(username);

  if(user) {
    return res.status(400).send({ message: 'Username already taken' });
  }

  const hashedPassword = await hashPassword(password);

  const userData = {
    username, 
    password: hashedPassword
  };

  saveUser(userData);

  const accessToken = generateJsonWebToken(userData);

  return res.status(200).send({ accessToken });
};

export { registerEmployee };
