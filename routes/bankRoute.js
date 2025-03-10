import express from "express";
import { deposit, withdraw, transfer, getBalance } from "../controller/bankController.js";

const router = express.Router();

router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/transfer", transfer);
router.get("/balance/:userId", getBalance);

router.get("/", (req, res) => {
    res.send("Bank API is working!");
});

export default router;

