import jwt from "jsonwebtoken";

const secret = "your_jwt_secret";

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
