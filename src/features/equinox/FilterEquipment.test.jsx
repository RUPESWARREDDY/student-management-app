import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FilterEquipment from "./FilterEquipment";
import axios from "axios";

vi.mock("axios");

vi.mock("jspdf", () => {
  return {
    jsPDF: vi.fn().mockImplementation(() => ({
      text: vi.fn(),
      addPage: vi.fn(),
      save: vi.fn(),
    })),
  };
});
vi.mock("jspdf-autotable", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("xlsx", () => ({
  utils: {
    book_new: vi.fn(() => ({})),
    json_to_sheet: vi.fn(() => ({})),
    book_append_sheet: vi.fn(),
  },
  writeFile: vi.fn(),
}));

describe("FilterEquipment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({ data: [] });
  });

  it("renders heading and icons", () => {
    render(<FilterEquipment />);
    expect(screen.getByText("Filter Equipments")).toBeInTheDocument();
 
    expect(screen.getAllByRole("button")).not.toHaveLength(0);
  });

  it("opens column selection dialog when ViewWeekIcon clicked", () => {
    render(<FilterEquipment />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]); 
    expect(screen.getByText("Select Visible Columns")).toBeInTheDocument();
  });

  it("toggles a fitness column checkbox", async () => {
    render(<FilterEquipment />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]); 

    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);

    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox).toBeChecked();
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });

  it("opens export menu when FileDownload icon clicked", async () => {
    render(<FilterEquipment />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[3]); 
    expect(await screen.findByText("Export as Excel")).toBeInTheDocument();
  });

  it("triggers Excel export", async () => {
    const { writeFile } = await import("xlsx");
    render(<FilterEquipment />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[3]); 
    const excelBtn = await screen.findByText("Export as Excel");
    fireEvent.click(excelBtn);
    await waitFor(() => {
      expect(writeFile).toHaveBeenCalled();
    });
  });

  it("calls axios to fetch data", async () => {
    render(<FilterEquipment />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/fitnessdevices"
      );
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/itAssets");
    });
  });
});
