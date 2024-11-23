import {
  DefaultError,
  UseInfiniteQueryOptions,
  QueryKey,
  InfiniteData,
} from "@tanstack/react-query";

export type InfiniteQueryConfig<
  TQueryFnData,
  TPageParam,
  TData = InfiniteData<TQueryFnData, TPageParam>,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey,
> = Partial<
  UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey,
    TPageParam
  >
>;
