import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type GetUserReposResponseDataDto =
  RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"];
