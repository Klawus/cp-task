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
