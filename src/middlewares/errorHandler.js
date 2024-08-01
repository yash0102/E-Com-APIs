import mongoose from "mongoose";
import { logger } from "./logger.middleware.js";

export class customErrorHandler extends Error {
    constructor(errMessage, statusCode) {
        super(errMessage);
        this.statusCode = statusCode;
    }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("error logging",err);

    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }

    if (err instanceof customErrorHandler) {
        const error_to_log = `TimeStamp: ${new Date().toString()} req URL: ${
        req.originalUrl
        } error msg: ${err.message}`;
        logger.error(error_to_log);
        res.status(err.statusCode).send(err.message);
    } else {
        const error_to_log = `TimeStamp: ${new Date().toString()} req URL: ${
        req.originalUrl
        } error msg: oops! something went wrong...Try again later!`;
        logger.error(error_to_log);
        res.status(500).send("oops! something went wrong...Try again later!");
    }
};
