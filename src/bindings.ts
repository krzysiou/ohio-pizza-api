import { helloWorld, helloWorldMiddleware } from './core/hello-world';
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
