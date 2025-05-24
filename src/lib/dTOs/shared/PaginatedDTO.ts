export type PaginatedDTO<T> = {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};
