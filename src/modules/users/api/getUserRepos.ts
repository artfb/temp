import { octokit } from "../../../api/apiClient";
import { GetUserReposRequestParamsDto } from "../dtos";

export const getUserRepos = (requestParams: GetUserReposRequestParamsDto) => {
  return octokit.repos.listForUser(requestParams).then((res) => ({
    data: res.data,
    hasNextPage: res.headers.link?.includes('rel="next"'),
  }));
};
