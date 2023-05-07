import { Request, Response } from 'express';

const pizzaJSON = [
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

const getPizzas = (req: Request, res: Response) => {
  // TODO: get data from database then remove mock json data
  return res.json(pizzaJSON).status(200).send();
};

export { getPizzas };
