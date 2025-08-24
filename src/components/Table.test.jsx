
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";

vi.mock("./Table.module.css", () => ({
  default: {
    tableSection: "tableSection",
    toggleRow: "toggleRow",
    dataGridContainer: "dataGridContainer",
  },
}));

vi.mock("@mui/x-data-grid", () => ({
  DataGrid: (props) => (
    <div data-testid="mock-datagrid">
      <div>Mock DataGrid</div>
      <div>Rows: {props.rows.length}</div>
      <div>Cols: {props.columns.length}</div>
    </div>
  ),
}));

describe("Table Component", () => {
  const baseProps = {
    title: "Test Table",
    count: 3,
    rows: [{ id: 1, name: "Row 1" }],
    columns: [{ field: "name", headerName: "Name" }],
    loading: false,
    expanded: true,
    onToggle: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders title and count", () => {
    render(<Table {...baseProps} />);
    expect(screen.getByText(/Test Table 3/i)).toBeInTheDocument();
  });

  it("renders DataGrid when expanded and not loading", () => {
    render(<Table {...baseProps} expanded={true} loading={false} />);
    expect(screen.getByTestId("mock-datagrid")).toBeInTheDocument();
  });

  it("renders loading spinner when loading=true", () => {
    render(<Table {...baseProps} expanded={true} loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-datagrid")).not.toBeInTheDocument();
  });

  it("does not render DataGrid when expanded=false", () => {
    render(<Table {...baseProps} expanded={false} />);
    expect(screen.queryByTestId("mock-datagrid")).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("calls onToggle when header row is clicked", () => {
    render(<Table {...baseProps} />);
    fireEvent.click(screen.getByText(/Test Table 3/i));
    expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows ExpandMoreIcon when expanded=true", () => {
    render(<Table {...baseProps} expanded={true} />);
    expect(screen.getByTestId("ExpandLessIcon")).toBeInTheDocument();
  });

  it("shows ExpandLessIcon when expanded=false", () => {
    render(<Table {...baseProps} expanded={false} />);
    expect(screen.getByTestId("ExpandMoreIcon")).toBeInTheDocument();
  });
});
