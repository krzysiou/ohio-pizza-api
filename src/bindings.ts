import { helloWorld, helloWorldMiddleware, getPizzas } from './core/';
import { Binding } from './types';

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
];

export { bindings };
