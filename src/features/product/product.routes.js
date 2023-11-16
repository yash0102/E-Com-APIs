// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express router.
const router = express.Router();

const productController = new ProductController();

// All the paths to controller methods(/api/products).
router.post('/rate', productController.rateProduct);
router.get('/filter', productController.filterProducts);
router.get('/', productController.getAllProducts);
router.post('/', upload.single('imageUrl'), productController.addProduct);
router.get('/:id', productController.getOneProduct);

export default router;