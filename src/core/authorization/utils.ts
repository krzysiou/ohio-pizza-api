import type { User } from './types';

const registeredUsers: User[] = [];

const findUser = (username: string) => {
  return registeredUsers.find((user) => user.username === username);
};

export { registeredUsers, findUser };