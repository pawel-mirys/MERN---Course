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

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });
  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getProductById, getProducts, createProduct, updateProduct };
