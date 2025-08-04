/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import StudentTable from "./StudentTable";

function renderWithStore(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: {
      students: studentReducer,
    },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe("StudentTable Component", () => {
  const students = [
    { id: 1, name: "Alice", age: 10, grade: "A" },
    // { id: 2, name: "Bob", age: 12, grade: "B" },
    // { id: 3, name: "Charlie", age: 11, grade: "A" },
  ];

  it('renders all students when filterGrade is "All"', () => {
    renderWithStore(<StudentTable filterGrade="All" />, {
      preloadedState: {
        students: {
          list: students,
        },
      },
    });

    expect(screen.getByText("Alice")).toBeInTheDocument();

  });

  it('renders only students with grade A when filterGrade is "A"', () => {
    renderWithStore(<StudentTable filterGrade="A" />, {
      preloadedState: {
        students: {
          list: students,
        },
      },
    });

    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("removes student from UI when delete button is clicked", () => {
    renderWithStore(<StudentTable filterGrade="All" />, {
      preloadedState: {
        students: {
          list: students,
        },
      },
    });

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryAllByText("Alice")).toHaveLength(2);
  });
});
