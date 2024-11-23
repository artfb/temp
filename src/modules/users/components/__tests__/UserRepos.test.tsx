import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserRepos } from "../UserRepos";
import { useGetUserReposQuery } from "../../queries/useGetUserRepos.query";
import { Repository } from "../../types";

vi.mock("../../queries/useGetUserRepos.query");
const mockUseGetUserReposQuery = vi.mocked(useGetUserReposQuery);

describe("UserRepos", () => {
  const mockUsername = "testuser";
  const mockRepos: Repository[] = [
    { name: "repo1", description: "Test repo 1", stargazers_count: 1 },
    { name: "repo2", description: "Test repo 2", stargazers_count: 1 },
  ];

  beforeEach(() => {
    // Reset mock before each test
    vi.clearAllMocks();
  });

  it("renders username in accordion summary", () => {
    mockUseGetUserReposQuery.mockReturnValue({
      data: [],
      isError: false,
      isPending: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });

    render(<UserRepos username={mockUsername} />);
    expect(screen.getByText(mockUsername)).toBeInTheDocument();
  });

  it("shows loading state when fetching data", () => {
    mockUseGetUserReposQuery.mockReturnValue({
      data: undefined,
      isError: false,
      isPending: true,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });

    render(<UserRepos username={mockUsername} />);
    fireEvent.click(screen.getByText(mockUsername));
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error message when fetch fails", () => {
    mockUseGetUserReposQuery.mockReturnValue({
      data: undefined,
      isError: true,
      isPending: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });

    render(<UserRepos username={mockUsername} />);
    fireEvent.click(screen.getByText(mockUsername));
    expect(screen.getByText("Error getting repos list")).toBeInTheDocument();
  });

  it("renders repository list when data is available", () => {
    mockUseGetUserReposQuery.mockReturnValue({
      data: mockRepos,
      isError: false,
      isPending: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });

    render(<UserRepos username={mockUsername} />);

    mockRepos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
    });
  });

  it("shows load more button when hasNextPage is true", () => {
    mockUseGetUserReposQuery.mockReturnValue({
      data: mockRepos,
      isError: false,
      isPending: false,
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });

    render(<UserRepos username={mockUsername} />);
    fireEvent.click(screen.getByText(mockUsername));
    expect(screen.getByText("Load more")).toBeInTheDocument();
  });

  it("calls fetchNextPage when load more button is clicked", async () => {
    const mockFetchNextPage = vi.fn();
    mockUseGetUserReposQuery.mockReturnValue({
      data: mockRepos,
      isError: false,
      isPending: false,
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage: mockFetchNextPage,
    });

    render(<UserRepos username={mockUsername} />);
    fireEvent.click(screen.getByText(mockUsername));
    fireEvent.click(screen.getByText("Load more"));

    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
