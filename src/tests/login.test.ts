import axios from 'axios';
import { randomString } from './utils';

describe('test login', () => {
  it('should return 404 if user not found', async () => {
    await axios
      .post('http://localhost:3001/admin/login', {
        username: randomString(10),
        password: randomString(10),
      })
      .catch((err) => {
        expect(err.response.status).toBe(404);
        expect(err.response.data.message).toEqual('User not found');
      });
  });

  it('should return 401 if password is invalid', async () => {
    await axios
      .post('http://localhost:3001/admin/login', {
        username: 'admin1',
        password: randomString(10),
      })
      .catch((err) => {
        expect(err.response.status).toBe(401);
        expect(err.response.data.message).toEqual('Invalid password');
      });
  });

  it('should return 200 if password is valid', async () => {
    const res = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('accessToken');
    expect(res.data.accessToken).toEqual(expect.any(String));
  });
});
