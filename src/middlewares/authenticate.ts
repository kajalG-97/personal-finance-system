import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = verifyToken(token);
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
