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
  const [pizzasInfo, pizzasIngredients] = await Promise.all([
    PostgresClient.query<Omit<Pizza, 'ingredients'>>(
      'select * from get_pizza()'
    ),
    PostgresClient.query<{
      pizza_name: string;
      ingredient_name: string;
    }>('select * from get_all_pizzas()'),
  ]);

  const pizzas: Pizza[] = pizzasInfo.rows.map((pizza) => {
    return {
      ...pizza,
      price: Number(pizza.price),
      ingredients: pizzasIngredients.rows
        .filter((p) => p.pizza_name === pizza.name)
        .map((p) => p.ingredient_name),
    };
  });

  return res.json(pizzas).status(200);
};

export { getPizzas };
