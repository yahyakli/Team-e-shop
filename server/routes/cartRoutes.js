import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import checkToken from '../middleware/checkToken.js';

const router = express.Router();

router.post('/cart', checkToken, addToCart);
router.get('/cart/:userId', checkToken, getCart);
router.delete('/cart', checkToken, removeFromCart);
router.delete('/cart/:userId/clear', checkToken, clearCart);

export default router;
