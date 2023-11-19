import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

type UnknownKeys = "passthrough" | "strict" | "strip";

export type Schema<T extends ZodRawShape> = ZodObject<T, UnknownKeys>;

export type MiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;
