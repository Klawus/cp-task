import z from "zod";
import { Page, PageOutput } from "./pagination.types";
import { preprocessString } from "../preprocess-string";

export function paginate<T>(
  data: T[],
  { limit, offset, totalCount }: PageOutput,
): Page<T> {
  return {
    data,
    page: {
      limit,
      offset,
      count: data.length,
      totalCount,
      hasNextPage: totalCount > offset + limit,
      hasPreviousPage: offset > 0,
    },
  };
}

export const PAGE_REQUEST_SCHEMA = z.strictObject({
  offset: z.preprocess(
    preprocessString,
    z.number().int().min(0).optional().default(0),
  ),
  limit: z.preprocess(
    preprocessString,
    z.number().int().min(1).optional().default(10),
  ),
});

export type PageRequest = z.infer<typeof PAGE_REQUEST_SCHEMA>;

export const DEFAULT_PAGE_REQUEST: Required<PageRequest> = {
  offset: 0,
  limit: 10,
};

export { Page, PageOutput };
