/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { randomString } from './utils';

describe('test delete pizza', () => {
  it('should return 401 if no token was provided', async () => {
    await axios
      .post('http://localhost:3001/admin/delete-pizza', {
        pizzaId: 1,
      })
      .catch((err) => {
        expect(err.response.status).toBe(401);
        expect(err.response.data.message).toEqual('Authorization failed');
      });
  });

  it('should return 401 if token is invalid', async () => {
    await axios
      .post(
        'http://localhost:3001/admin/delete-pizza',
        {
          pizzaId: 1,
        },
        { headers: { Authorization: `Bearer ${randomString(100)}` } }
      )
      .catch((err) => {
        expect(err.response.status).toBe(401);
        expect(err.response.data.message).toEqual('Authorization failed');
      });
  });

  it('should return 400 if we dont pass any data', async () => {
    const token = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    await axios
      .post(
        'http://localhost:3001/admin/delete-pizza',
        {},
        { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
      )
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.message).toEqual('Missing required fields');
      });
  });

  it('should delete pizza if data is valid', async () => {
    const token = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    // Add pizza
    await axios.post(
      'http://localhost:3001/admin/add-pizza',
      {
        name: 'pizza1',
        ingredients: ['ing1', 'ing2'],
        price: 10,
      },
      { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
    );
    const pizzas = await axios.get('http://localhost:3001/pizza');
    const pizza = pizzas.data.find((p: any) => p.name === 'pizza1');
    const res = await axios.post(
      'http://localhost:3001/admin/delete-pizza',
      {
        pizzaId: pizza.pizza_id,
      },
      { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
    );
    expect(res.status).toBe(200);
    expect(res.data.message).toEqual('Pizza deleted successfully');
  });
});
