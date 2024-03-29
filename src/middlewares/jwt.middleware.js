import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // 1. Read the token.
    const token = req.headers['authorization'];

    // 2. if no token , return the error.
    if (!token) {
        return res.status(401).send('Unathorized');
    }

    // 3. check if token is valid
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = payload.userID;
        // console.log("payload ", payload);
    } catch (err) {
        // 4. return error.
        return res.status(401).send('Unathorized');
    }

    // 5. call next middleware
    next();
}

export default jwtAuth;