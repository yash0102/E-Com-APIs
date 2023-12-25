// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const router = express.Router();

const productController = new ProductController();

// All the paths to controller methods(/api/products).
router.post('/rate',jwtAuth, (req, res, next)=>{
    productController.rateProduct(req, res, next)
});

router.get('/filter', (req, res)=>{
    productController.filterProducts(req, res)
});

router.get('/',  (req, res)=>{
    productController.getAllProducts(req, res)
});

router.post('/', upload.single('imageUrl'), (req, res)=>{
    productController.addProduct(req, res)
});

router.get('/:id', (req, res)=>{
    productController.getOneProduct(req, res)
});

export default router;