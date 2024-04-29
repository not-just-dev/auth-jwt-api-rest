import jwt from "jsonwebtoken";
import { type Response, type Request, type NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
