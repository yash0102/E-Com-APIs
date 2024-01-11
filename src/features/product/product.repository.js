import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from '../../middlewares/errorHandler.js';



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
            return await collection.find(filterExpression).toArray();
            
        }catch(err){
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async rate(userID, productID, rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            // 1. Removes existing entry
            await collection.updateOne({
                _id: new ObjectId(productID)
            },{
                $pull:{ratings:{userID: new ObjectId(userID)}}
            })

            // 2. Add new entry
            await collection.updateOne({
                _id:new ObjectId(productID)
            },{
                $push: {ratings: {userID:new ObjectId(userID), rating}}
            })

        }catch(err){
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }



}

export default ProductRepository;