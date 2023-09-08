import express from 'express';
import { View } from './view';
const app = express();

app.get('/', async (_req, res) => {
  res.send(await View());
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
