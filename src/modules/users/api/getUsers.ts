import { apiClient } from "../../../api";
import { GetUsersQueryParamsDto, GetUsersResponseDataDto } from "../dtos";
import { SEARCH_USERS_API_URL } from "./endpoints";

export const getUsers = (queryParams: GetUsersQueryParamsDto) => {
  return apiClient
    .get<GetUsersResponseDataDto>(SEARCH_USERS_API_URL, {
      params: queryParams,
    })
    .then((res) => res.data);
};
