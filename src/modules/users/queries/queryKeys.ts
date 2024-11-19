import { GetUserReposRequestParamsDto } from "../dtos";
import { UseGetUsersParams } from "../types";

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params: UseGetUsersParams) =>
    [...usersKeys.lists(), { params }] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: number) => [...usersKeys.details(), id] as const,

  repoLists: () => [...usersKeys.all, "repos"] as const,
  repoList: (params: GetUserReposRequestParamsDto) =>
    [...usersKeys.lists(), { params }] as const,
};
