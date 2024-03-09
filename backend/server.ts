import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products.js';
import { ProductType } from './types/types.js';

const productsData: ProductType[] = products as ProductType[];

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('API is rinning...');
});

app.get('/api/products', (req, res) => {
  res.json(productsData);
});

app.get('/api/products/:id', (req, res) => {
  const product = productsData.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
