import express from 'express';
const router = express.Router();
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from '../controllers/product.mjs';

router.get('/', getProducts);
router.get('/:productId', getProduct);

router.post('/', createProduct);

router.put('/:productId', updateProduct);

router.delete('/:productId', deleteProduct);

export default router;
