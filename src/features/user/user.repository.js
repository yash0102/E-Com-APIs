import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";



// Creating model from Schema.
const UserModel = mongoose.model('User', userSchema)

export default class UserRepository{

    async signUp(user) {
        try {
            // Create Document(instance of model)
            const newUser = new UserModel(user);
            await newUser.save();
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async signIn(email, password) {
        try {
            return await UserModel.findOne({email, password});
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async findByEmail(email) {
        try {
            return await UserModel.findOne({email});
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }
}