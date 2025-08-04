/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StudentDetails from "./StudentDetails";

describe("StudentDetails component", () => {
  const mockStudent = {
    name: "Alice",
    age: 10,
    grade: "A",
    image: "https://example.com/image.jpg",
    description: "Top student in class.",
  };

  test("renders student details correctly when state is provided", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/student-details", state: mockStudent }]}
      >
        <Routes>
          <Route path="/student-details" element={<StudentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Age: 10")).toBeInTheDocument();
    expect(screen.getByText("Grade: A")).toBeInTheDocument();
    expect(screen.getByText("Top student in class.")).toBeInTheDocument();
    expect(screen.getByAltText("Alice")).toBeInTheDocument();
  });

  test("redirect message shown when state is missing", () => {
    render(
      <MemoryRouter initialEntries={["/student-details"]}>
        <Routes>
          <Route path="/student-details" element={<StudentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/No student data found/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  test("navigates back to dashboard when back button is clicked", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/student-details", state: mockStudent }]}
      >
        <Routes>
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/dashboard" element={<div>Mock Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByText("Mock Dashboard")).toBeInTheDocument();
  });
});
