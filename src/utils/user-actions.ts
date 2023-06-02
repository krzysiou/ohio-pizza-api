import { PostgresClient } from '../db';
import { User } from '../types';

const findUser = async (username: string) => {
  const result = await PostgresClient.query('select * from get_employee()');
  return result.rows.find((user) => user.login === username) as User;
};

const saveUser = async (user: User) => {
  const {username, password} = user;

  await PostgresClient.query(`select * from insert_employee('${username}', '${password}')`);
};

export { findUser, saveUser };
