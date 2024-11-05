import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, upload } from "../controllers/productController.js";
import checkToken from '../middleware/checkToken.js';

const router = express.Router();

router.post('/products', checkToken, upload.single('image'), createProduct);
router.get('/products', checkToken, getAllProducts);
router.get('/products/:id', checkToken, getProductById);
router.put('/products/:id', checkToken, upload.single('image'), updateProduct);
router.delete('/products/:id', checkToken, deleteProduct);

export default router;
