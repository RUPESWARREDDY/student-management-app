import {
  fetchStudents,
  addStudent,
  deleteStudent,
} from "../../features/students/studentSlice";

import {
  getStudents,
  createStudent,
  removeStudent,
} from "../../api/studentApi";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../api/studentApi", () => ({
  getStudents: vi.fn(),
  createStudent: vi.fn(),
  removeStudent: vi.fn(),
}));

describe("studentSlice async thunks", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();

  it("should handle fetchStudents fulfilled", async () => {
    const mockStudents = [
      { id: 1, name: "Alice", age: 10 },
      { id: 2, name: "Bob", age: 12 },
    ];
    getStudents.mockResolvedValueOnce({ data: mockStudents });

    const thunk = fetchStudents();
    const action = await thunk(dispatch, getState, undefined);

    expect(action.type).toBe("students/fetch/fulfilled");
    expect(action.payload).toEqual(mockStudents);
  });

  it("should handle addStudent fulfilled", async () => {
    const newStudent = { id: 3, name: "Charlie", age: 11 };
    createStudent.mockResolvedValueOnce({ data: newStudent });

    const thunk = addStudent(newStudent);
    const action = await thunk(dispatch, getState, undefined);

    expect(action.type).toBe("students/add/fulfilled");
    expect(action.payload).toEqual(newStudent);
  });

  it("should handle deleteStudent fulfilled", async () => {
    const studentId = 1;
    removeStudent.mockResolvedValueOnce();

    const thunk = deleteStudent(studentId);
    const action = await thunk(dispatch, getState, undefined);

    expect(action.type).toBe("students/delete/fulfilled");
    expect(action.payload).toBe(studentId);
  });
});
