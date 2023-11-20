import { StatusCodes } from "http-status-codes";

type UUID = string;
type PropertyPath = string;
type ErrorMessages = string[];

export class CommandNotSupportedError extends Error {}

export abstract class AppError extends Error {
  protected constructor(
    message: string,
    public readonly httpCode: StatusCodes,
    public readonly details: unknown = {},
  ) {
    super(message);
  }
}

export class InputValidationError extends AppError {
  constructor(details?: Record<PropertyPath, ErrorMessages>) {
    super(
      "Input validation failed, check out the details",
      StatusCodes.UNPROCESSABLE_ENTITY,
      details,
    );
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}

export class UseCaseError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super("Page not found", StatusCodes.NOT_FOUND);
  }
}

export class NotFoundResourceError extends AppError {
  constructor(resourceName: string, ...resourceIds: UUID[]) {
    super(
      `Resource [${resourceName}] with ID = [${resourceIds.join(
        ",",
      )}] not found`,
      StatusCodes.NOT_FOUND,
    );
  }
}
