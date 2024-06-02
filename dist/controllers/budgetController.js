"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingBudget = exports.createBudget = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBudget = async (req, res) => {
    const { amount, month, year } = req.body;
    const userId = req.userId;
    try {
        const budget = await prisma.budget.create({
            data: {
                amount,
                remainingAmount: amount,
                month,
                year,
                userId,
            },
        });
        res.status(201).json({ budget });
    }
    catch (error) {
        res.status(400).json({ error: "Budget creation failed" });
    }
};
exports.createBudget = createBudget;
const getRemainingBudget = async (req, res) => {
    const { categoryId, month, year } = req.params;
    const userId = req.userId;
    try {
        const budget = await prisma.budget.findFirst({
            where: {
                userId,
                categoryId: parseInt(categoryId),
                month: parseInt(month),
                year: parseInt(year),
            },
        });
        if (!budget) {
            return res.status(404).json({ error: "Budget not found" });
        }
        res.json({ remainingAmount: budget.remainingAmount });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch remaining budget" });
    }
};
exports.getRemainingBudget = getRemainingBudget;
