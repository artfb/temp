import { UseGetQueryParams } from "../types";

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params: UseGetQueryParams) =>
    [...usersKeys.lists(), { params }] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: number) => [...usersKeys.details(), id] as const,
};
