import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Logger } from "winston";
import { AppError } from "../errors";

export const errorHandler =
  ({ logger }: { logger: Logger }) =>
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.toString());

    if (err instanceof AppError) {
      return res.status(err.httpCode).json({
        error: err.message,
        details: err.details,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      name: err.name,
      error: err.message,
    });
  };
