import type { Request, Response, NextFunction } from "express";
import { ValidationException } from "../exceptions/validation-exception";

export class ExceptionHandlerMiddleware {
  public handle = async (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {

    if (err instanceof ValidationException) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: err.message,
        errors: err.errors,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  };
}
