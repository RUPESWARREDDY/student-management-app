// DevicesTable.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DevicesTable from "./DevicesTable";
import axios from "axios";

// Mock CSS module
vi.mock("./DevicesTable.module.css", () => ({
  default: {
    pageWrapper: "pageWrapper",
    headerRow: "headerRow",
    iconRow: "iconRow",
    iconButton: "iconButton",
  },
}));

// Mock axios
vi.mock("axios");

// Mock DeviceTable to just render title and count
vi.mock("../../components/Table", () => ({
  default: ({ title, count }) => (
    <div data-testid="device-table">
      <span>{title}</span>
      <span>Count: {count}</span>
    </div>
  ),
}));

describe("DevicesTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches devices and assets and renders tables", async () => {
    const mockDevices = [
      { id: 1, name: "Treadmill" },
      { id: 2, name: "Rowing Machine" },
    ];
    const mockAssets = [{ id: 1, name: "Laptop" }];

    axios.get
      .mockResolvedValueOnce({ data: mockDevices }) // fitnessdevices
      .mockResolvedValueOnce({ data: mockAssets }); // itAssets

    render(<DevicesTable />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/fitnessdevices");
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/itAssets");
    });

    expect(screen.getByText("Fitness Devices")).toBeInTheDocument();
    expect(screen.getByText("IT Assets")).toBeInTheDocument();
    expect(screen.getAllByTestId("device-table")).toHaveLength(2);
    expect(screen.getByText("Count: 2")).toBeInTheDocument();
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error("Network error"));

    render(<DevicesTable />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });

    expect(consoleSpy).toHaveBeenCalledWith("Fetch failed", expect.any(Error));
    consoleSpy.mockRestore();
  });
});
