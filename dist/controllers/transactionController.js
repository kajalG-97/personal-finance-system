"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTransaction = async (req, res) => {
    const { amount, type, categoryId } = req.body;
    const userId = req.userId;
    try {
        // Get current month and year
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        // Fetch the user's budget for the given category, month, and year
        const budget = await prisma.budget.findFirst({
            where: {
                userId: userId,
                month: month,
                year: year,
                categoryId: categoryId,
            },
        });
        // Calculate total expenses for the category in the current month
        const totalExpenses = await prisma.transaction.aggregate({
            where: {
                userId: userId,
                categoryId: categoryId,
                date: {
                    gte: new Date(`${year}-${month}-01`),
                    lt: new Date(`${year}-${month + 1}-01`),
                },
                type: "expense",
            },
            _sum: {
                amount: true,
            },
        });
        // Check if the budget is exceeded
        if (budget && totalExpenses._sum.amount + amount > budget.amount) {
            return res
                .status(400)
                .json({ error: "Budget exceeded for this category" });
        }
        // Update the remaining budget
        if (budget) {
            await prisma.budget.update({
                where: { id: budget.id },
                data: {
                    remainingAmount: budget.remainingAmount - amount,
                },
            });
        }
        // Create the transaction
        const transaction = await prisma.transaction.create({
            data: {
                amount,
                type,
                categoryId,
                userId,
            },
        });
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createTransaction = createTransaction;
