import bodyParser from 'body-parser';
import type { Binding } from './types';
import { getPizzas, loginEmployee, registerEmployee } from './core/';

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
];

export { bindings };

