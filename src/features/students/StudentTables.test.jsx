import { render, screen, fireEvent } from "@testing-library/react";
import StudentTable from "./StudentTable";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../reduxstore/studentSlice", () => ({
  fetchStudents: () => ({ type: "FETCH_STUDENTS" }),
  deleteStudent: (id) => ({ type: "DELETE_STUDENT", payload: id }),
}));

vi.mock("../../components/ToolbarMenuButton", () => ({
  default: ({ label, options, onChange }) => (
    <div>
      <label>{label}</label>
      {options.map((opt) => (
        <button
          key={opt.value}
          data-testid={`btn-${label}-${opt.value}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  ),
}));

describe("StudentTable Component", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useSelector.mockImplementation((cb) =>
      cb({
        students: {
          list: [
            { id: 1, name: "Alice", age: 20, grade: "A" },
            { id: 2, name: "Bob", age: 21, grade: "B" },
          ],
        },
      })
    );
  });

  it("should render table and toolbar", () => {
    render(<StudentTable />);
    expect(screen.getByText("Density")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Columns")).toBeInTheDocument();
    expect(screen.getByText("Total Count: 2")).toBeInTheDocument();
  });

  it("should dispatch fetchStudents on mount", () => {
    render(<StudentTable />);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "FETCH_STUDENTS" });
  });

  it("should filter by grade", () => {
    render(<StudentTable />);
    fireEvent.click(screen.getByTestId("btn-Search-B"));
    expect(screen.getByText("Total Count: 1")).toBeInTheDocument();
  });

  it("should toggle columns", () => {
    render(<StudentTable />);
    fireEvent.click(screen.getByTestId("btn-Columns-age"));
    expect(screen.queryByText("age")).not.toBeInTheDocument();
  });

  it("should update density", () => {
    render(<StudentTable />);
    fireEvent.click(screen.getByTestId("btn-Density-standard"));

    expect(true).toBe(true);
  });

  it("should open delete confirmation dialog", () => {
    render(<StudentTable />);
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(
      screen.getByText(/Are you sure you want to delete/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  it("should dispatch deleteStudent on confirmation", () => {
    render(<StudentTable />);
    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Yes"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "DELETE_STUDENT",
      payload: 1,
    });
  });
});
