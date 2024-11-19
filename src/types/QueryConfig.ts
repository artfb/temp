import { UseQueryOptions } from "@tanstack/react-query";

export type QueryConfig<TFnData, TData = TFnData, TError = unknown> = Partial<
  UseQueryOptions<TFnData, TError, TData>
>;
