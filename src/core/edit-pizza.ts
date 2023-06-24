import type { Request, Response } from 'express';
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
      ingredients: pizzasIngredients.rows
        .filter((p) => p.pizza_name === pizza.name)
        .map((p) => p.ingredient_name),
    };
  });
  
  return res.json(pizzas).status(200);
};

const addPizza = async (req: Request, res: Response) => {
  const { name, price, ingredients, image } = req.body;

  if (name === undefined || price === undefined || ingredients === undefined) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  const pizzaId = (
    await PostgresClient.query(
      `INSERT INTO pizza(name, price, pic_url) VALUES ('${name}', ${price}, '${image}') RETURNING pizza_id`
    )
  ).rows[0].pizza_id;

  const ingredientIds = (
    await Promise.all(
      ingredients.map(async (ingredient: string) =>
        PostgresClient.query(
          `INSERT INTO ingredient(name) VALUES ('${ingredient}') RETURNING ingredient_id`
        )
      )
    )
  ).map((result) => result.rows[0].ingredient_id);

  Promise.all(
    ingredientIds.map(async (ingredientId: number) =>
      PostgresClient.query(
        `INSERT INTO pizza_to_ingredients_relation(pizza_id, ingredient_id) VALUES (${pizzaId}, ${ingredientId})`
      )
    )
  );

  res.status(200).send({ message: 'Pizza added successfully' });
};

const deletePizza = async (req: Request, res: Response) => {
  const { pizzaId } = req.body;
  if (pizzaId === undefined) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  const ingredientIds = (
    await PostgresClient.query(
      `SELECT ingredient_id FROM pizza_to_ingredients_relation WHERE pizza_id = ${pizzaId}`
    )
  ).rows.map((result) => result.ingredient_id);

  Promise.all([
    PostgresClient.query(
      `DELETE FROM pizza_to_ingredients_relation WHERE pizza_id = ${pizzaId}`
    ),
    ingredientIds.map(async (ingredientId: number) =>
      PostgresClient.query(
        `DELETE FROM ingredient WHERE ingredient_id = ${ingredientId}`
      )
    ),
    PostgresClient.query(`DELETE FROM pizza WHERE pizza_id = ${pizzaId}`),
  ]);

  res.status(200).send({ message: 'Pizza deleted successfully' });
};

export { addPizza, deletePizza, getPizzas };

