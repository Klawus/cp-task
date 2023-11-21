import { StatusCodes } from "http-status-codes";

type UUID = string;
type PropertyPath = string;
type ErrorMessages = string[];

export enum ErrorCode {
  UNRECOGNIZED_ERROR = "UNRECOGNIZED_ERROR",
  NOT_FOUND = "NOT_FOUND",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  USE_CASE_ERROR = "USE_CASE_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
  ALREADY_EXISTS_ERROR = "ALREADY_EXISTS_ERROR",
}

export class UseCaseNotSupportedError extends Error {}

export abstract class AppError extends Error {
  protected constructor(
    message: string,
    public readonly httpCode: StatusCodes,
    public readonly errorCode: ErrorCode = ErrorCode.UNRECOGNIZED_ERROR,
    public readonly details: unknown = {},
  ) {
    super(message);
  }
}

export class InputValidationError extends AppError {
  constructor(details?: Record<PropertyPath, ErrorMessages>) {
    super(
      "Input validation failed, check out the details",
      StatusCodes.BAD_REQUEST,
      ErrorCode.INPUT_VALIDATION_ERROR,
      details,
    );
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST, ErrorCode.VALIDATION_ERROR);
  }
}

export class UseCaseError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.USE_CASE_ERROR);
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super("Page not found", StatusCodes.NOT_FOUND, ErrorCode.NOT_FOUND);
  }
}

export class NotFoundResourceError extends AppError {
  constructor(resourceName: string, ...resourceIds: UUID[]) {
    super(
      `Resource [${resourceName}] with ID = [${resourceIds.join(
        ",",
      )}] not found`,
      StatusCodes.NOT_FOUND,
      ErrorCode.RESOURCE_NOT_FOUND,
    );
  }
}

export class AlreadyExistsError extends AppError {
  constructor(resourceName: string, ...attributeNames: string[]) {
    const joinedAttributes = `[${attributeNames.join(", ")}]`;
    super(
      `${resourceName} with given ${
        attributeNames.length > 0 ? joinedAttributes : "attributes"
      } already exists`,
      StatusCodes.CONFLICT,
      ErrorCode.ALREADY_EXISTS_ERROR,
    );
  }
}
