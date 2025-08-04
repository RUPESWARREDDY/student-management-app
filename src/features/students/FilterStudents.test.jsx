/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import FilterStudents from "./FilterStudents";
import { vi } from "vitest";

vi.mock("./StudentTable", () => ({
  default: ({ filterGrade }) => (
    <div data-testid="student-table">Filtered by: {filterGrade}</div>
  ),
}));

test("renders filter select and updates StudentTable on change", () => {
  render(<FilterStudents />);

  const select = screen.getByRole("combobox");
  expect(select).toBeInTheDocument();

  fireEvent.mouseDown(select);
  fireEvent.click(screen.getByText("B"));

  expect(screen.getByTestId("student-table")).toHaveTextContent(
    "Filtered by: B"
  );
});
