import {
  DefaultError,
  UseInfiniteQueryOptions,
  QueryKey,
  InfiniteData,
} from "@tanstack/react-query";

export type InfiniteQueryConfig<
  TQueryFnData,
  TPageParam,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData, TPageParam>,
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
