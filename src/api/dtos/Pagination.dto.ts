export type PaginatedQueryRequestParamsDto = {
  page?: number;
  perPage?: number;
};

export type PaginatedQueryResponseDataDto<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
};
