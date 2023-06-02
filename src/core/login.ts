import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { findUser } from '../utils/user-actions';
import { generateJsonWebToken } from '../utils/jwt-actions';

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

  const accessToken = generateJsonWebToken(user);

  res.status(200).send({ accessToken });
};

export { loginEmployee };
