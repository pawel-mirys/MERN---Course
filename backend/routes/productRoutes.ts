import express, { Request, Response, Router } from 'express';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { ProductType } from '../types/types.js';

const router: Router = express.Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const products: ProductType[] = await Product.find({});
    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const product: ProductType | null = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    }
    res.status(404).json({ message: 'Product not found' });
  })
);

export default router;
