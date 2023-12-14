import express from "express";
const router = express.Router();
import { UserController } from "./user.controller.js";

const userController = new UserController();

router.post("/signup", (req, res) => {
    userController.signUp(req, res);
});
router.post("/signin", (req, res)=> {
    userController.signIn(req, res);
});

export default router;