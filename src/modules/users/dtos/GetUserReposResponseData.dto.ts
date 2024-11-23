import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type GetUserReposResponseDataDto = {
  data: RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"];
  hasNextPage: boolean | undefined;
};
