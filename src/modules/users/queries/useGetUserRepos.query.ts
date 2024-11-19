import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "./queryKeys";
import { Repository, UseGetUserReposParams } from "../types";
import { getUserRepos } from "../api";
import { GetUserReposResponseDataDto } from "../dtos";
import { QueryConfig } from "../../../types";

export const useGetUserReposQuery = (
  params: UseGetUserReposParams,
  config?: QueryConfig<GetUserReposResponseDataDto, Repository[]>,
) => {
  return useQuery({
    queryKey: usersKeys.repoList(params),
    queryFn: () =>
      getUserRepos({
        username: params.username,
      }),
    select: (data) =>
      data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
      })),
    ...config,
  });
};
