/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { randomString } from './utils';

describe('test add pizza', () => {
  it('should return 401 if no token was provided', async () => {
    await axios
      .post('http://localhost:3001/admin/add-pizza', {
        name: 'pizza1',
        ingredients: ['ing1', 'ing2'],
        price: 10,
      })
      .catch((err) => {
        expect(err.response.status).toBe(401);
        expect(err.response.data.message).toEqual('Authorization failed');
      });
  });

  it('should return 401 if token is invalid', async () => {
    await axios
      .post(
        'http://localhost:3001/admin/add-pizza',
        {
          name: 'pizza1',
          ingredients: ['ing1', 'ing2'],
          price: 10,
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
        'http://localhost:3001/admin/add-pizza',
        {},
        { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
      )
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.message).toEqual('Missing required fields');
      });
  });

  it('should add pizza if data is valid', async () => {
    const token = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    const res = await axios.post(
      'http://localhost:3001/admin/add-pizza',
      {
        name: 'pizza1',
        ingredients: ['ing1', 'ing2'],
        price: 10,
      },
      { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
    );
    expect(res.status).toBe(200);
    expect(res.data.message).toEqual('Pizza added successfully');

    // Delete pizza
    const pizzas = await axios.get('http://localhost:3001/pizza');
    const pizza = pizzas.data.find((p: any) => p.name === 'pizza1');
    await axios.post(
      'http://localhost:3001/admin/delete-pizza',
      {
        pizzaId: pizza.pizza_id,
      },
      { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
    );
  });
});
