import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { describe, it, expect, vi } from "vitest";

// Mock child components
vi.mock("../features/students/AddStudentForm", () => ({
  default: () => <div data-testid="add-student-form">AddStudentForm</div>,
}));

vi.mock("../features/students/StudentTable", () => ({
  default: () => <div data-testid="student-table">StudentTable</div>,
}));

describe("Dashboard Component", () => {
  it("should render AddStudentForm and StudentTable", () => {
    render(<Dashboard />);

    expect(screen.getByTestId("add-student-form")).toBeInTheDocument();
    expect(screen.getByTestId("student-table")).toBeInTheDocument();
  });
});
