"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const budgetRoutes_1 = __importDefault(require("./routes/budgetRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", authRoutes_1.default);
app.use("/budgets", budgetRoutes_1.default);
app.use("/transactions", transactionRoutes_1.default);
exports.default = app;
