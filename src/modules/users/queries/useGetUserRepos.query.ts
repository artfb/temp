import { useInfiniteQuery } from "@tanstack/react-query";
import { usersKeys } from "./queryKeys";
import { Repository, UseGetUserReposParams } from "../types";
import { getUserRepos } from "../api";
import { GetUserReposResponseDataDto } from "../dtos";
import { InfiniteQueryConfig } from "../../../types";

export const useGetUserReposQuery = (
  params: UseGetUserReposParams,
  config?: InfiniteQueryConfig<
    GetUserReposResponseDataDto,
    number,
    Repository[]
  >,
) => {
  const {
    data,
    isError,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: usersKeys.repoList(params),
    queryFn: ({ pageParam }) =>
      getUserRepos({
        username: params.username,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.hasNextPage ? lastPageParam + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.data.map((repo) => ({
          name: repo.name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
        })),
      ),
    ...config,
  });

  return {
    data,
    isError,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};
