import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const requestHandler = async (
  res: Response,
  code: StatusCodes,
  result: Promise<any>,
) => {
  const resolvedResult = await result;

  return res.status(code).json(resolvedResult);
};
