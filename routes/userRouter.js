import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", (req, res) => {
    res.send("Users API is working!");
});

export default router;