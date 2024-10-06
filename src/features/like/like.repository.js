import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { likeSchema } from "./like.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

const LikeModel = mongoose.model('Like', likeSchema);

export class LikeRepository {
    async getLikes(type, id) {
        return await LikeModel.find({
            likeable: new ObjectId(id),
            types: type
        }).populate('user').populate({path: 'likeable', model: type}) // path , model are predefine attribute
    }

    async likeProduct(userId, productId){
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(productId),
                types: 'Product'
            });
            await newLike.save();
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async likeCategory(userId, categoryId){
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(categoryId),
                types: 'Category'
            });
            await newLike.save();
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }
}