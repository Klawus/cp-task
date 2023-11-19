import { objectOutputType, ZodIssue, ZodRawShape, ZodTypeAny } from "zod";
import { InputValidationError } from "../errors";
import { Schema } from "../types";

function formatErrorDetails(issues: ZodIssue[]): Record<string, string[]> {
  return issues.reduce(
    (acc, issue) => {
      const key = issue.path.join(".");
      return { ...acc, [key]: [...(acc[key] ?? []), issue.message] };
    },
    {} as Record<string, string[]>,
  );
}

export function parseInputAgainstSchema<T extends ZodRawShape>(
  schema: Schema<T>,
  input: unknown,
): objectOutputType<T, ZodTypeAny> {
  const parsed = schema.safeParse(input);
  if (parsed.success) {
    return parsed.data;
  }
  throw new InputValidationError(formatErrorDetails(parsed.error.issues));
}
