import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { bindings } from './bindings';
import { initRouter } from './utils/init-router';
import { initDBConnection } from './db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'] }));

initDBConnection();
initRouter(app, port, bindings);
