import dotenv from 'dotenv';
import express, { Express } from 'express';
import { bindings } from './bindings';
import { initRouter } from './utils/init-router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

initRouter(app, port, bindings);
