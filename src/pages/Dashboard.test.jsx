import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("../features/students/AddStudentForm", () => ({
  default: () => <div>MockAddStudentForm</div>,
}));

vi.mock("../features/students/FilterStudents", () => ({
  default: () => <div>MockFilterStudents</div>,
}));

import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  it("renders AddStudentForm and FilterStudents", () => {
    render(<Dashboard />);

    expect(screen.getByText("MockAddStudentForm")).toBeInTheDocument();
    expect(screen.getByText("MockFilterStudents")).toBeInTheDocument();
  });
});
