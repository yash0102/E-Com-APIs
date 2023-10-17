// 1. Import Express
import express from 'express';
import bodyParser from 'body-parser';
import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';

// 2. Create Server
const server = express();

server.use(bodyParser.json());

// for all requests related to product , redirect to product routes.
server.use('/api/products',basicAuthorizer ,ProductRouter); 
server.use('/api/users',UserRouter); 

// 3. Default request handler
server.get("/", (req, res) => {
    res.send("Welcome to Ecommerce APIs");
})

// 4. Specify port 
server.listen(3200, ()=> {
    console.log('Server is running on Port: ', 3200);
});