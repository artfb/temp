import { useInfiniteQuery } from "@tanstack/react-query";
import { usersKeys } from "./queryKeys";
import { UseGetQueryParams } from "../types";
import { getUsers } from "../api";
import { GetUsersResponseDataDto } from "../dtos";
import { InfiniteQueryConfig } from "../../../types";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_INITIAL_PAGE = 1;

export const useGetUsersQuery = (
  params: UseGetQueryParams,
  config?: InfiniteQueryConfig<GetUsersResponseDataDto, number>,
) => {
  return useInfiniteQuery({
    queryKey: usersKeys.list(params),
    queryFn: ({ pageParam }) =>
      getUsers({
        q: params.query,
        page: pageParam,
        per_page: DEFAULT_PAGE_SIZE,
      }),
    initialPageParam: DEFAULT_INITIAL_PAGE,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const allData = allPages.flatMap((p) => p.items);

      return allData.length < lastPage.total_count
        ? lastPageParam + 1
        : undefined;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    ...config,
  });
};
