/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

describe('test get pizzas', () => {
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
});
