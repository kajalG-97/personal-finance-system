import express from "express";
import authRoutes from "./routes/authRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);
app.use("/transactions", transactionRoutes);

export default app;
