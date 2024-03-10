import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products/products.js';
import connectDB from './config/db.js';
import { ProductType } from './types/types.js';
import productRoutes from './routes/productRoutes.js';

const productsData: ProductType[] = products as ProductType[];

const port = process.env.PORT;
await connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API is rinning...');
});

app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
