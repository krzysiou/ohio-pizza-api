import { Request, Response } from 'express';
import { PostgresClient } from '../db';

type Pizza = {
  pizza_id: number;
  name: string;
  ingredients: string[];
  price: number;
  pic_url?: string;
};

const getPizzas = async (_req: Request, res: Response<Pizza[]>) => {
  const pizzas = await PostgresClient.query<Omit<Pizza, 'ingredients'>>(
    'select * from get_pizza()'
  );

  const pizzasWithIngredients = await Promise.all(
    pizzas.rows.map(async ({ pizza_id, pic_url, name, price }) => {
      const res = await PostgresClient.query<{
        pizza_name: string;
        ingredient_name: string;
      }>('select * from get_pizza_with_ingredients_table($1)', [pizza_id]);

      const ingredients = res.rows.map(
        ({ ingredient_name }) => ingredient_name
      );
      return {
        pizza_id,
        name,
        ingredients,
        pic_url,
        price: price || 9.99, // TODO: remove after add price in the db
      };
    })
  );

  return res.json(pizzasWithIngredients).status(200);
};

export { getPizzas };
