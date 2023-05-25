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
  // TODO: get data from database then remove mock json data
  // const pgRes = await PostgresClient.query<Pizza[]>('SELECT * FROM pizza');

  return res.json(pizzaJSON).status(200).send();
};

export { getPizzas };
