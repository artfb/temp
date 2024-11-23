import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useSearchingUsers } from "../useSearchingUsers";
import { useGetUsersQuery } from "../../queries";

vi.mock("../../queries", () => ({
  useGetUsersQuery: vi.fn(),
}));

describe("useSearchingUsers", () => {
  const mockUseGetUsersQuery = useGetUsersQuery as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetUsersQuery.mockImplementation(() => ({
      data: { items: [] },
      isFetching: false,
      isError: false,
    }));
  });

  it("should initialize with empty values", () => {
    const { result } = renderHook(() => useSearchingUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.searchQuery).toBe("");
  });

  it("should update search query when form is submitted", async () => {
    const { result } = renderHook(() => useSearchingUsers());
    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;
    const setValue = result.current.form.setValue;
    const mockQuery = "test query";

    setValue("query", mockQuery);
    result.current.handleSubmit(mockEvent);

    await waitFor(() => {
      expect(result.current.searchQuery).toBe(mockQuery);
    });
  });

  it("should call useGetUsersQuery with correct parameters", () => {
    renderHook(() => useSearchingUsers());

    expect(mockUseGetUsersQuery).toHaveBeenCalledWith(
      { query: "" },
      { enabled: false },
    );
  });

  it("should return users from the query response", () => {
    const mockUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];

    mockUseGetUsersQuery.mockImplementation(() => ({
      data: { items: mockUsers },
      isFetching: false,
      isError: false,
    }));

    const { result } = renderHook(() => useSearchingUsers());

    expect(result.current.users).toEqual(mockUsers);
  });
});
