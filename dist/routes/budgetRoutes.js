"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budgetController_1 = require("../controllers/budgetController");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.authenticate, budgetController_1.createBudget);
router.get("/remaining/:categoryId/:month/:year", authenticate_1.authenticate, budgetController_1.getRemainingBudget);
exports.default = router;
