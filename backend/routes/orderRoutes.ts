import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateToDelivered,
  getAllOrders,
  createNewOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(admin, getAllOrders);

router.route('/mine').get(protect, getMyOrders);

router.route('/:id').get(protect, admin, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/:id/deliver').put(admin, admin, updateToDelivered);

export default router;
