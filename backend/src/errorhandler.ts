import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Server error:", error);

  return res.status(500).json({
    message: "Something went wrong on the server.",
  });
}