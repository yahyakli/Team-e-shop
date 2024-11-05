import express from "express";
import { createOrder, getUserOrders, getAllOrders } from "../controllers/orderController.js";
import checkToken from '../middleware/checkToken.js';

const router = express.Router();

router.post('/orders', checkToken, createOrder);
router.get('/orders/:userId', checkToken, getUserOrders);
router.get('/orders', checkToken, getAllOrders);

export default router;
