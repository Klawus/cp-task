import { AnyZodObject, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { parseInputAgainstSchema } from "./functions/parse-against-schema";

export const createValidationMiddleware =
  (
    schema: ZodObject<{
      params?: AnyZodObject;
      body?: AnyZodObject;
      query?: AnyZodObject;
    }>,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedResult = parseInputAgainstSchema(schema, req);

      if (parsedResult.params) {
        Object.assign(res.locals, {
          parameter: parsedResult.params,
        });
      }

      if (parsedResult.body) {
        Object.assign(res.locals, {
          input: parsedResult.body,
        });
      }

      if (parsedResult.query) {
        Object.assign(res.locals, {
          query: parsedResult.query,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
