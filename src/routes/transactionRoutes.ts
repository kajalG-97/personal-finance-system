import { Router } from "express";
import { createTransaction } from "../controllers/transactionController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/", authenticate, createTransaction);

export default router;
