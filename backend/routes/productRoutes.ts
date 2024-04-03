import express, { Request, Response, Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

router.route('/').post(protect, admin, createProduct);

export default router;
