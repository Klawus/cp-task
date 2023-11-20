import z from "zod";

export type PageOutput = {
  limit: number;
  offset: number;
  totalCount: number;
};

export type PageParams = {
  limit: number;
  offset: number;
  count: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export interface Page<T> {
  data: T[];
  page: PageParams;
}

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
  offset: z.string().transform((it) => Number(it) ?? 0),
  limit: z.string().transform((it) => Number(it) ?? 10),
});

export type PageRequest = z.infer<typeof PAGE_REQUEST_SCHEMA>;

export const DEFAULT_PAGE_REQUEST: Required<PageRequest> = {
  offset: 0,
  limit: 10,
};
