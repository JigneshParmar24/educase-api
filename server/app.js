import express from 'express';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send("hello from the other side"));

export default app;