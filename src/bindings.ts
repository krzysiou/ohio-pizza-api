import bodyParser from 'body-parser';
import type { Binding } from './types';
import {
  addPizza,
  addReservation,
  deletePizza,
  deleteReservation,
  getPizzas,
  loginEmployee,
  registerEmployee,
} from './core/';
import { verifyJsonWebToken } from './utils/jwt-actions';

const jsonParser = bodyParser.json();

const bindings: Binding[] = [
  {
    method: 'GET',
    path: '/pizza',
    callback: getPizzas,
  },
  {
    method: 'POST',
    path: '/admin/login',
    callback: loginEmployee,
    middleware: jsonParser,
  },
  {
    method: 'POST',
    path: '/admin/register',
    callback: registerEmployee,
    middleware: jsonParser,
  },
  {
    method: 'POST',
    path: '/admin/add-pizza',
    callback: addPizza,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/admin/delete-pizza',
    callback: deletePizza,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/admin/add-reservation',
    callback: addReservation,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/admin/delete-reservation',
    callback: deleteReservation,
    middleware: [jsonParser, verifyJsonWebToken],
  },
];

export { bindings };
