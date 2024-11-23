import "@testing-library/jest-dom";
import { afterEach, beforeAll, afterAll } from "vitest";
import { server } from "./server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
