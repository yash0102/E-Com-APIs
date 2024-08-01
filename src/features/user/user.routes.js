import express from "express";
const router = express.Router();
import { UserController } from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const userController = new UserController();

router.post("/signup", (req, res) => {
    userController.signUp(req, res);
});
router.post("/signin", (req, res)=> {
    userController.signIn(req, res);
});
router.put("/resetPassword", jwtAuth, (req, res, next)=> {
    userController.resetPassword(req, res, next);
});

export default router;