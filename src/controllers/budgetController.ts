import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBudget = async (req: Request, res: Response) => {
  const { amount, month, year, categoryId } = req.body;
  const userId = (req as any).userId;

  try {
    const budget = await prisma.budget.create({
      data: {
        amount,
        remainingAmount: amount,
        month,
        year,
        userId,
        categoryId,
      },
    });

    res.status(201).json({ budget });
  } catch (error) {
    res.status(400).json({ error: 'Budget creation failed' });
  }
};

export const getRemainingBudget = async (req: Request, res: Response) => {
  const { categoryId, month, year } = req.params;
  const userId = (req as any).userId;

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
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json({ remainingAmount: budget.remainingAmount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch remaining budget' });
  }
};
