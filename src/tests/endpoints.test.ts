import axios from 'axios';

describe('test endpoints', () => {
  it('should return correct pizzas array', async () => {
    const res = await axios.get('http://localhost:3001/pizza');

    expect(res.status).toBe(200);
    expect(res.data).toBeInstanceOf(Array);
    expect(res.data.length).toBeGreaterThan(0);

    res.data.every((pizza: any) => {
      expect(pizza).toHaveProperty('pizza_id');
      expect(pizza.pizza_id).toEqual(expect.any(Number));
      expect(pizza).toHaveProperty('name');
      expect(pizza.name).toEqual(expect.any(String));
      expect(pizza).toHaveProperty('ingredients');
      expect(pizza.ingredients).toBeInstanceOf(Array);
      expect(
        pizza.ingredients.every((i: unknown) => typeof i === 'string')
      ).toBe(true);
      expect(pizza).toHaveProperty('price');
      expect(pizza.price).toEqual(expect.any(Number));
      expect(pizza).toHaveProperty('pic_url');
      expect(typeof pizza.pic_url === 'string' || pizza.pic_url === null).toBe(
        true
      );
    });
  });

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
});

const randomString = (n: number) =>
  [...Array(n)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
