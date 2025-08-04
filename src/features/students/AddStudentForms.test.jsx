/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../../Redux-store/studentSlice";
import AddStudentForm from "./AddStudentForm";
import React from "react";

describe("AddStudentForm", () => {
  it("dispatches addStudent on form submit", async () => {
    const store = configureStore({
      reducer: { students: studentReducer },
    });

    render(
      <Provider store={store}>
        <AddStudentForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "10" },
    });

    fireEvent.mouseDown(screen.getByRole("combobox"));

    fireEvent.click(await screen.findByText("A"));

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() =>
      expect(store.getState().students.list).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "Alice", age: 10, grade: "A" }),
        ])
      )
    );
  });
});
