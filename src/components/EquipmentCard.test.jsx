// EquipmentCard.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EquipmentCard from "./EquipmentCard";

// Mock CSS modules
vi.mock("./EquipmentCard.module.css", () => ({
  default: {
    card: "card",
    cardHeader: "cardHeader",
    media: "media",
    status: "status",
    deviceName: "deviceName",
    deviceQuantity: "deviceQuantity",
    reasonText: "reasonText",
    reasonValue: "reasonValue",
    maintenance: "maintenance",
    moreBtn: "moreBtn",
  },
}));

describe("EquipmentCard Component", () => {
  const mockEquipment = {
    status: "Active",
    name: "Treadmill X100",
    quantity: 5,
    reason: "Routine check",
    maintenance: "Ongoing",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders equipment details correctly", () => {
    render(<EquipmentCard equipment={mockEquipment} />);

    expect(screen.getByText(mockEquipment.status)).toBeInTheDocument();
    expect(screen.getByText(mockEquipment.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Device Quantity ${mockEquipment.quantity.toString().padStart(2, "0")}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockEquipment.reason)).toBeInTheDocument();
    expect(screen.getByText(mockEquipment.maintenance)).toBeInTheDocument();
  });

  it("renders equipment image with correct src and alt", () => {
    render(<EquipmentCard equipment={mockEquipment} />);
    const img = screen.getByRole("img", { name: /image/i });
    expect(img).toHaveAttribute("src", "/src/assets/threadmill.png");
    expect(img).toHaveAttribute("alt", "image");
  });

  it("renders MoreVertIcon button", () => {
    render(<EquipmentCard equipment={mockEquipment} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("MoreVertIcon")).toBeInTheDocument();
  });
});
