import express, { Request, Response, Router } from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

const router: Router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

export default router;
