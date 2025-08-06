/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import ToolbarMenuButton from "./ToolbarMenuButton";
import { vi } from "vitest";
import FilterListIcon from "@mui/icons-material/FilterList"; 

describe("ToolbarMenuButton", () => {
  const options = [
    { label: "Name", value: "name" },
    { label: "Age", value: "age" },
    { label: "Grade", value: "grade" },
  ];

  const setup = (props = {}) => {
    const onChangeMock = vi.fn();
    render(
      <ToolbarMenuButton
        icon={<FilterListIcon />}
        label="Columns"
        options={options}
        selected={["name"]}
        onChange={onChangeMock}
        {...props}
      />
    );
    return { onChangeMock };
  };

  it("renders button with label", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /columns/i })
    ).toBeInTheDocument();
  });

  it("opens menu on button click", () => {
    setup();
    const button = screen.getByRole("button", { name: /columns/i });
    fireEvent.click(button);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Grade")).toBeInTheDocument();
  });

  it("checks selected options", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /columns/i }));
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked(); 
    expect(checkboxes[1]).not.toBeChecked();
  });

  it("calls onChange when option is clicked (multiple=true)", () => {
    const { onChangeMock } = setup({ multiple: true });
    fireEvent.click(screen.getByRole("button", { name: /columns/i }));
    fireEvent.click(screen.getByText("Age"));
    expect(onChangeMock).toHaveBeenCalledWith("age");
  });

  it("calls onChange and closes menu when multiple=false", () => {
    const { onChangeMock } = setup({ multiple: false });
    const button = screen.getByRole("button", { name: /columns/i });
    fireEvent.click(button);
    fireEvent.click(screen.getByText("Age"));
    expect(onChangeMock).toHaveBeenCalledWith("age");
    expect(screen.queryByText("name")).not.toBeInTheDocument();
  });

  it("renders checkboxes with FormControlLabel if showFormControl=true", () => {
    setup({ showFormControl: true });
    fireEvent.click(screen.getByRole("button", { name: /columns/i }));
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument(); 
  });

  it("renders without checkboxes if showCheckbox=false", () => {
    setup({ showCheckbox: false });
    fireEvent.click(screen.getByRole("button", { name: /columns/i }));
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
