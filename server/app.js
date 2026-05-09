import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import schoolRouter from './routers/school.routers.js';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("hello from the other side"));

app.use('/api/v1/school/', schoolRouter);

export default app;