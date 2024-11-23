import { octokit } from "../../../api/apiClient";
import { GetUsersRequestParamsDto } from "../dtos";

export const getUsers = (requestParams: GetUsersRequestParamsDto) => {
  return octokit.search
    .users({
      page: requestParams.page,
      per_page: requestParams.per_page,
      q: `${requestParams.q} in:login`,
    })
    .then((res) => {
      return res.data;
    });
};
