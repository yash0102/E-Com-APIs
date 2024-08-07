import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";


export default class ProductController {
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req, res) {
        try{
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
        } catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }  
    }

    async addProduct(req, res) {
        try{
            const { name, description, price, categories, sizes, stock } = req.body;
            const newProduct = new ProductModel(name, description, parseFloat(price),
            req?.file?.filename, categories, sizes?.split(','), stock
            );
        
            const createdProduct = await this.productRepository.add(newProduct);
            res.status(201).send(createdProduct);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async rateProduct(req, res, next) {
        try {
            const userID = req.userID;
            console.log("userID ",userID);
            const productID = req.body.productID;
            const rating = req.body.rating;
    
            await this.productRepository.rate( userID, productID, rating);
            return res.status(200).send('Rating added successfully');          
        } catch (error) {
            next(error);
        }
    }

    async getOneProduct(req, res) {
        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if (!product) {
                res.status(404).send('Product not found');
            } else {
                return res.status(200).send(product);
            }
        } catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async filterProducts(req, res) {
        try{
            const minPrice = req.query.minPrice;
            const category = req.query.categories;
            const result = await this.productRepository.filter(minPrice, category);
            res.status(200).send(result);
        }catch(err){
                console.log(err);
                return res.status(200).send("Something went wrong");
        }
    }

    async averagePrice(req, res, next){
        try {
            const result = await this.productRepository.averageProductPricePerCategory();
            console.log("result ", result);
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }
};