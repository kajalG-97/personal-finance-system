"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.authenticate, transactionController_1.createTransaction);
exports.default = router;
