import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/E-Com-DB";

const connectToMongoDB = () => {
    MongoClient.connect(url)
        .then( client => {
            console.log("MongoDB is Connected");//
        })
        .catch(err => {
            console.log(err);
        })
}

export default connectToMongoDB;