import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { ProductType } from '../types/types';

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products: ProductType[] = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product: ProductType | null = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource Not Found');
});

export { getProductById, getProducts };
