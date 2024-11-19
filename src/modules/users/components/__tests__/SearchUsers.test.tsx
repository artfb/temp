import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SearchUsers } from "../SearchUsers";
import { render } from "../../../../utils/test-utils";

describe("SearchUsers", () => {
  it("renders search input and button", () => {
    render(<SearchUsers />);

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  // it("shows loading state", () => {
  //   render(<SearchUsers />);

  //   expect(screen.getByRole("progressbar")).toBeInTheDocument();
  // });
});
