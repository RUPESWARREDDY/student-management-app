import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { toast } from "react-toastify";

// Mock useNavigate and toast
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("NavBar Component", () => {
  const mockToggleTheme = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders the NavBar with title and buttons", () => {
    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="light" />
      </MemoryRouter>
    );

    expect(screen.getByText("Student Management System")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it("calls toggleTheme when theme icon is clicked", () => {
    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="light" />
      </MemoryRouter>
    );

    const themeButton = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    fireEvent.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("handles logout correctly", () => {
    localStorage.setItem("token", "123456"); // Ensure token exists

    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="dark" />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
    expect(toast.success).toHaveBeenCalledWith("Logout successful!");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
