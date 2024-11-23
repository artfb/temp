import { act, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SearchUsersPage } from "../SearchUsersPage";
import { render } from "../../../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { server } from "@tests/server";
import { http, HttpResponse } from "msw";

describe("SearchUsersPage", () => {
  it("renders search input and button", () => {
    render(<SearchUsersPage />);

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows loading state", async () => {
    render(<SearchUsersPage />);
    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    await act(async () => {
      await userEvent.type(searchInput, "abc");
    });
    await act(async () => {
      searchButton.click();
    });

    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
  });

  it("shows validation error on empty value", async () => {
    render(<SearchUsersPage />);
    const searchButton = screen.getByRole("button", { name: /search/i });

    await act(async () => {
      searchButton.click();
    });

    expect(screen.getByText("query is a required field")).toBeInTheDocument();
  });

  it("shows returned non-empty data", async () => {
    render(<SearchUsersPage />);

    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /search/i });

    await act(async () => {
      await userEvent.type(searchInput, "test query");
    });

    await act(async () => {
      searchButton.click();
    });

    expect(await screen.findByText("Showing results for: test query"));

    expect(screen.getByText("ArtS")).toBeInTheDocument();
    expect(screen.getByText("artsy")).toBeInTheDocument();
    expect(screen.getByText("ArtSabintsev")).toBeInTheDocument();
  });

  it("shows returned empty data message", async () => {
    server.use(
      http.get("https://api.github.com/search/users", () => {
        return HttpResponse.json({ items: [] });
      }),
    );
    render(<SearchUsersPage />);

    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /search/i });

    await act(async () => {
      await userEvent.type(searchInput, "test query");
    });

    await act(async () => {
      searchButton.click();
    });

    expect(await screen.findByText("Showing results for: test query"));

    expect(await screen.findByText("No results")).toBeInTheDocument();
  });

  it("handles server error", async () => {
    server.use(
      http.get("https://api.github.com/search/users", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(<SearchUsersPage />);

    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /search/i });

    await act(async () => {
      await userEvent.type(searchInput, "test query");
    });

    await act(async () => {
      searchButton.click();
    });

    expect(await screen.findByText("Error fetching users")).toBeInTheDocument();
  });

  it("handles client request error", async () => {
    server.use(
      http.get("https://api.github.com/search/users", () => {
        return new HttpResponse(null, { status: 403 });
      }),
    );

    render(<SearchUsersPage />);

    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /search/i });

    await act(async () => {
      await userEvent.type(searchInput, "test query");
    });

    await act(async () => {
      searchButton.click();
    });

    expect(await screen.findByText("Error fetching users")).toBeInTheDocument();
  });
});
