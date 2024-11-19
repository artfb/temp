import { octokit } from "../../../api/apiClient";
import { GetUserReposRequestParamsDto } from "../dtos";

export const getUserRepos = (requestParams: GetUserReposRequestParamsDto) => {
  return octokit.rest.repos.listForUser(requestParams).then((res) => res.data);
};
