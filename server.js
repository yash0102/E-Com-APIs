// 1. Import Express
import express from 'express';

// 2. Create Server
const server = express();

// 3. Default request handler
server.get("/", (req, res) => {
    res.send("Welcome to Ecommerce APIs");
})

// 4. Specify port 
server.listen(3200, ()=> {
    console.log('Server is running on Port: ', 3200);
});