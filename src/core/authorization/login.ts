import { Request, Response } from 'express';
import { findUser } from './utils';
import { compare } from 'bcrypt';

const validatePassword = async (passedPassword: string, validHashedPassword: string): Promise<boolean> => {
  const passwordMatching = await compare(passedPassword, validHashedPassword);
  return passwordMatching;
};

const loginEmployee = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = findUser(username);

  if(!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }
  
  const passwordMatching = await validatePassword(password, user.password);
  
  if(!passwordMatching) {
    res.status(401).send({ message: 'Invalid password' });
    return;
  }

  res.status(200).send({ message: 'Looged in' });
};

export { loginEmployee };