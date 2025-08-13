import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import React from "react";

// Mock child components with test IDs
vi.mock("../features/equinox/SubHeader", () => ({
  default: () => <div data-testid="subheader">Mock SubHeader</div>,
}));

vi.mock("../features/equinox/EquipmentCarousel", () => ({
  default: () => (
    <div data-testid="equipment-carousel">Mock EquipmentCarousel</div>
  ),
}));

vi.mock("../features/equinox/FilterEquipment", () => ({
  default: () => <div data-testid="filter-equipment">Mock FilterEquipment</div>,
}));

import Devices from "./Devices";

describe("Devices component", () => {
  it("renders without crashing", () => {
    render(<Devices />);

    expect(screen.getByTestId("subheader")).toBeInTheDocument();
    expect(screen.getByTestId("equipment-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("filter-equipment")).toBeInTheDocument();
  });

  it("renders the child components in the correct order", () => {
    render(<Devices />);

    const container = screen.getByTestId("devices-container");
    const children = within(container).getAllByTestId(/subheader|equipment-carousel|filter-equipment/);

    expect(children[0]).toHaveTextContent("Mock SubHeader");
    expect(children[1]).toHaveTextContent("Mock EquipmentCarousel");
    expect(children[2]).toHaveTextContent("Mock FilterEquipment");
  });
});
