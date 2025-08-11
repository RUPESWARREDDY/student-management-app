import { render, screen, fireEvent } from "@testing-library/react";
import SubHeader from "./SubHeader";
import { describe, it, expect, vi } from "vitest";
import React from "react";

vi.mock("./SubHeader.module.css", () => ({
  default: {
    subheader: "subheader",
    titleBox: "titleBox",
    searchBox: "searchBox",
    searchIcon: "searchIcon",
    searchInput: "searchInput",
    addButton: "addButton",
  },
}));

describe("SubHeader component", () => {
  it("renders the Equipment title", () => {
    render(<SubHeader />);
    // Only check the heading element, not the button text
    const heading = screen.getByRole("heading", { name: "Equipment" });
    expect(heading).toBeInTheDocument();
  });

  it("renders the search input with correct placeholder", () => {
    render(<SubHeader />);
    const input = screen.getByPlaceholderText(/Search Equipment/i);
    expect(input).toBeInTheDocument();
  });

  it("renders the Add Equipment button", () => {
    render(<SubHeader />);
    expect(
      screen.getByRole("button", { name: /\+ Add Equipment/i })
    ).toBeInTheDocument();
  });

  it("allows typing in the search input", () => {
    render(<SubHeader />);
    const input = screen.getByPlaceholderText(/Search Equipment/i);
    fireEvent.change(input, { target: { value: "Drill" } });
    expect(input.value).toBe("Drill");
  });

  it("renders both icons", () => {
    const { container } = render(<SubHeader />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(2); // back arrow + search icon
  });

  it("renders icons using data-testid", () => {
    render(<SubHeader />);
    expect(screen.getByTestId("ArrowBackIosNewIcon")).toBeInTheDocument();
    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
  });
});
