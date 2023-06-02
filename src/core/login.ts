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

  const user = await findUser(username);

  if(!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  
  const passwordMatching = await validatePassword(password, user.password);
  
  if(!passwordMatching) {
    return res.status(401).send({ message: 'Invalid password' });
  }

  const accessToken = generateJsonWebToken(user);

  return res.status(200).send({ accessToken });
};

export { loginEmployee };
