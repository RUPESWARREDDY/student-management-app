/* eslint-disable no-undef */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../../reduxstore/studentSlice";
import AddStudentForm from "./AddStudentForm";
import userEvent from "@testing-library/user-event";

it("dispatches addStudent on form submit", async () => {
  const store = configureStore({
    reducer: { students: studentReducer },
  });

  render(
    <Provider store={store}>
      <AddStudentForm />
    </Provider>
  );
  await userEvent.type(screen.getByLabelText(/name/i), "Alice");
  await userEvent.type(screen.getByLabelText(/age/i), "10");

  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByRole("option", { name: "A" }));


  await userEvent.click(screen.getByRole("button", { name: /add/i }));

  await waitFor(() =>
    expect(store.getState().students.list).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Alice", age: 10, grade: "A" }),
      ])
    )
  );
});
