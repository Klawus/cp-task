import { AnyZodObject, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { parseInputAgainstSchema } from "./parse-against-schema";

export const createValidationMiddleware =
  (
    schema: ZodObject<{
      params?: AnyZodObject;
      body?: AnyZodObject;
      query?: AnyZodObject;
    }>,
  ) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parseResult = parseInputAgainstSchema(schema, req);
      Object.assign(req, parseResult);

      next();
    } catch (error) {
      next(error);
    }
  };
