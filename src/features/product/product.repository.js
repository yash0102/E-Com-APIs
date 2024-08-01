import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from '../../middlewares/errorHandler.js';
import mongoose from 'mongoose';
import { productSchema } from './product.Schema.js';
import { reviewSchema } from './review.schema.js';

// No need to write 'Products' mongoose add 's' internally
const ProductModel = mongoose.model('Product', productSchema);
const ReviewModel = mongoose.model('Review', reviewSchema);


class ProductRepository{

    constructor(){
        this.collection = "products";
    }

    async add(newProduct){
        try{
            // 1 . Get the db.
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        } catch(err){
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        } catch(err){
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async filter(minPrice, categories){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }

            categories = JSON.parse(categories.replace(/'/g,'"'));
            console.log(categories);
            if(categories){
                filterExpression = {$or: [{category:{$in:categories}}, filterExpression]}
            }
            return await collection.find(filterExpression).project({name:1, price:1, _id:0, ratings:{$slice:-1}}).toArray();
            
        }catch(err){
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async rate(userID, productID, rating){
        try{
            // Check if Product exists
            const productToUpdate = await ProductModel.findById(productID);
            if(!productToUpdate){
                throw new Error("Product not found");
            }

            // Get the existing review
            const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
            console.log("userReview ", userReview);
            if(userReview){
                userReview.rating = rating;
                await userReview.save();
            }else {
                const newReview = new ReviewModel({
                    product: new ObjectId(productID),
                    user: new ObjectId(userID),
                    rating: rating
                });
                newReview.save();
            }
        }catch(err){
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async averageProductPricePerCategory() {
        try {
            const db = getDB();
            return await db.collection(this.collection)
                .aggregate([
                    {
                        // Stage 1: Get Average price per category
                        $group : {
                            _id:"$category",
                            averagePrice: {$avg:"$price"}
                        }
                    }
                ]).toArray();
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

}

export default ProductRepository;