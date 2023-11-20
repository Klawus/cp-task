import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Logger } from "winston";
import { AppError, ErrorCode } from "../errors";

export const errorHandler =
  ({ logger }: { logger: Logger }) =>
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.toString());

    if (err instanceof AppError) {
      return res.status(err.httpCode).json({
        errorCode: err.errorCode,
        message: err.message,
        details: err.details,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: ErrorCode.UNRECOGNIZED_ERROR,
      message: err.message,
      name: err.name,
      stack: err.stack,
    });
  };
