import { StatusCodes } from "http-status-codes";

type UUID = string;
type PropertyPath = string;
type ErrorMessages = string[];

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

export enum ErrorType {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  NOT_FOUND_RESOURCE_ERROR = "NOT_FOUND_RESOURCE_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNPROCESSABLE_ENTITY_ERROR = "UNPROCESSABLE_ENTITY_ERROR",
  UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR",
  INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
  CONFLICTING_STATE_ERROR = "CONFLICTING_STATE_ERROR",
  ALREADY_EXISTS_ERROR = "ALREADY_EXISTS_ERROR",
}
