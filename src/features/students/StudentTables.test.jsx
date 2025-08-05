/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import StudentTable from "./StudentTable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../../reduxstore/studentSlice";
import { vi } from "vitest";

vi.mock("../../apiConfig.js", () => ({
  deleteStudent: vi.fn(),
}));

const mockStudents = [
  { id: 1, name: "Alice", age: 10, grade: "A" },
  { id: 2, name: "Bob", age: 12, grade: "B" },
  { id: 3, name: "Charlie", age: 11, grade: "A" },
];

describe("StudentTable Component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        students: studentsReducer,
      },
      preloadedState: {
        students: {
          list: mockStudents,
        },
      },
    });

    vi.spyOn(store, "dispatch");
  });

  const renderComponent = (filterGrade = "All") =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <StudentTable filterGrade={filterGrade} />
        </MemoryRouter>
      </Provider>
    );

  it('renders all students when filterGrade is "All"', () => {
    renderComponent("All");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it('renders only students with grade A when filterGrade is "A"', () => {
    renderComponent("A");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  it("removes student when delete button is clicked", () => {
    renderComponent("All");
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
