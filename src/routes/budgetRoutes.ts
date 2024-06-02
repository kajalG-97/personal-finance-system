import { Router } from "express";
import {
  createBudget,
  getRemainingBudget,
} from "../controllers/budgetController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/", authenticate, createBudget);
router.get(
  "/remaining/:categoryId/:month/:year",
  authenticate,
  getRemainingBudget
);

export default router;
