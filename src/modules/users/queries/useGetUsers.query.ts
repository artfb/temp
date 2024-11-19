import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "./queryKeys";
import { UseGetUsersParams } from "../types";
import { getUsers } from "../api";
import { GetUsersResponseDataDto } from "../dtos";
import { QueryConfig } from "../../../types";

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_INITIAL_PAGE = 1;

export const useGetUsersQuery = (
  params: UseGetUsersParams,
  config?: QueryConfig<GetUsersResponseDataDto>,
) => {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () =>
      getUsers({
        q: params.query,
        page: DEFAULT_INITIAL_PAGE,
        per_page: DEFAULT_PAGE_SIZE,
      }),
    ...config,
  });
};
