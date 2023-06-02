import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { findUser, registeredUsers } from './utils';
import { v4 } from 'uuid';

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const registerEmployee = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if(!username || !password) {
    res.status(400).send({ message: 'Username or password was not provided' });
    return;
  }

  const user = findUser(username);

  if(user) {
    res.status(400).send({ message: 'Username already taken' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const userData = {
    id: v4(), 
    username, 
    password: hashedPassword
  };

  registeredUsers.push(userData);

  res.status(200).send({ message: 'User registered' });
};

export { registerEmployee };