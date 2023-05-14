import { Request, Response } from 'express';
import { PostgresClient } from '../db';

type Pizza = {
  name: string;
  ingredients: string[];
  price: number;
  imageUrl?: string;
};

const pizzaJSON: Pizza[] = [
  {
    name: 'Margherita',
    ingredients: ['tomato sauce', 'mozzarella cheese', 'fresh basil'],
    price: 9.99,
  },
  {
    name: 'Pepperoni',
    ingredients: ['tomato sauce', 'mozzarella cheese', 'pepperoni'],
    price: 11.99,
  },
  {
    name: 'Vegetarian',
    ingredients: [
      'tomato sauce',
      'mozzarella cheese',
      'mushrooms',
      'green peppers',
      'red onions',
      'black olives',
    ],
    price: 10.99,
  },
];

const getPizzas = async (_req: Request, res: Response<Pizza[]>) => {
  // TODO: get data from database then remove mock json data
  // const pgRes = await PostgresClient.query<Pizza[]>('SELECT * FROM pizza');

  return res.json(pizzaJSON).status(200).send();
};

export { getPizzas };
