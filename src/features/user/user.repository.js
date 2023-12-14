import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";


class UserRepository {
    
    async signUp(newUser) {
        try {
            // 1. Get the database
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("users");
            // 3. Insert the document
            const user = await collection.insertOne(newUser);
            return user;
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }

    async signIn(email, password) {
        try {
            // 1. Get the database
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("users");
            // 3. Find the document
            const user = await collection.findOne({email, password});
            return user;
        } catch (err) {
            console.log(err);
            throw new customErrorHandler("Something went wrong with database", 500);
        }
    }
}

export default UserRepository;