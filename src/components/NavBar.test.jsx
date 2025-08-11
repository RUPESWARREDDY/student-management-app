import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { toast } from "react-toastify";

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

// Mock toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

// Mock CSS Modules
vi.mock("./NavBar.module.css", () => ({
  default: {
    "navbar-root": "navbar-root",
    "navbar-appbar": "navbar-appbar",
    "navbar-toolbar": "navbar-toolbar",
    "navbar-brand": "navbar-brand",
    logo: "logo",
    "navbar-search": "navbar-search",
    "navbar-search-input": "navbar-search-input",
    "navbar-links": "navbar-links",
    "navbar-link": "navbar-link",
    active: "active",
  }
}));


describe("NavBar Component", () => {
  const mockToggleTheme = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: "/dashboard" });
  });

  it("renders the NavBar with brand title and links", () => {
    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="light" />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /EQUINOX\s+\|\s+PHOTON/i })
    ).toBeInTheDocument();
    
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Devices" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Software" })).toBeInTheDocument();
  });

  it("renders search input with placeholder", () => {
    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="light" />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText(/Search anything or add bookmarks/i)
    ).toBeInTheDocument();
  });

  it("calls toggleTheme when theme icon is clicked (light mode)", () => {
    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="light" />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /switch to dark mode/i })
    );
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("calls toggleTheme when theme icon is clicked (dark mode)", () => {
    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="dark" />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /switch to light mode/i })
    );
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("handles logout correctly", () => {
    localStorage.setItem("token", "123456");

    render(
      <MemoryRouter>
        <NavBar toggleTheme={mockToggleTheme} mode="dark" />
      </MemoryRouter>
    );

    const logoutButton = screen.getAllByRole("button").at(-1);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
    expect(toast.success).toHaveBeenCalledWith("Logout successful!");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
