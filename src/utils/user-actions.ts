import { User } from '../types';

// TODO TEMPORARY
const registeredUsers: User[] = [];

const findUser = (username: string) => {
  // TODO CONNECT TO DB
  return registeredUsers.find((user) => user.username === username);
};

const saveUser = (user: User) => {
  // TODO CONNECT TO DB
  registeredUsers.push(user);
};

export { registeredUsers, findUser, saveUser };