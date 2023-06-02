import { Binding } from './types';
import { helloWorld, helloWorldMiddleware, getPizzas } from './core/';
import { loginEmployee } from './core/authorization/login';
import { registerEmployee } from './core/authorization/register';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();

const bindings: Binding[] = [
  {
    method: 'GET',
    path: '/',
    callback: helloWorld,
    middleware: helloWorldMiddleware,
  },
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

