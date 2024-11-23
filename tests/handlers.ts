import { http, delay, HttpResponse } from "msw";
import { usersMock } from "./mocks/users";

export const handlers = [
  http.get("https://api.github.com/search/users", async () => {
    await delay(100);
    return HttpResponse.json(usersMock);
  }),
];
