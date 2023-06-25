import axios from 'axios';
import { randomString } from './utils';

describe('test register', () => {
  it('should return 400 if we dont pass any data', async () => {
    await axios
      .post('http://localhost:3001/admin/register', {})
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.message).toEqual(
          'Username or password was not provided'
        );
      });
  });

  it('should return 400 if username already exists', async () => {
    await axios
      .post('http://localhost:3001/admin/register', {
        username: 'admin1',
        password: 'admin1',
      })
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.message).toEqual('Username already taken');
      });
  });

  it('should return 200 if user was created', async () => {
    const res = await axios.post('http://localhost:3001/admin/register', {
      username: randomString(10),
      password: randomString(10),
    });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('accessToken');
    expect(res.data.accessToken).toEqual(expect.any(String));
  });
});
