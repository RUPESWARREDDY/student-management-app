// EquipmentCarousel.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EquipmentCarousel from "./EquipmentCarousel";
import axios from "axios";

// Mock CSS modules
vi.mock("./EquipmentCarousel.module.css", () => ({
  default: { carouselItem: "carouselItem" },
}));

// Mock axios
vi.mock("axios");

// Mock EquipmentCard
vi.mock("../../components/EquipmentCard", () => ({
  default: ({ equipment }) => (
    <div data-testid="equipment-card">{equipment.name}</div>
  ),
}));

// Mock react-multi-carousel to render children directly
vi.mock("react-multi-carousel", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

describe("EquipmentCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls axios.get on mount and renders equipment cards", async () => {
    const mockData = [
      { id: 1, name: "Treadmill", status: "Active" },
      { id: 2, name: "Elliptical", status: "Inactive" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<EquipmentCarousel />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/outoforder"
      );
    });

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId("equipment-card")).toHaveLength(mockData.length);
  });

  it("renders no cards if API returns empty array", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<EquipmentCarousel />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(screen.queryByTestId("equipment-card")).not.toBeInTheDocument();
  });

  it("handles axios error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(<EquipmentCarousel />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });
});
