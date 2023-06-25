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
});

const randomString = (n: number) =>
  [...Array(n)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
