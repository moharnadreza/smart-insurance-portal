import { fireEvent, render, screen } from "@testing-library/react";
import { InsuranceCard } from "./InsuranceCard";

describe("InsuranceCard Component", () => {
  it("renders correctly with label and index", () => {
    render(
      <InsuranceCard label="Health Insurance" index={1} onClick={jest.fn()} />
    );
    expect(screen.getByText("Health Insurance")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <InsuranceCard label="Car Insurance" index={2} onClick={handleClick} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the ChevronRightIcon", () => {
    render(
      <InsuranceCard label="Home Insurance" index={3} onClick={jest.fn()} />
    );
    const chevronIcon = screen.getByTestId("icon");
    expect(chevronIcon).toBeDefined();
    expect(chevronIcon.getAttribute("width")).toBe("14");
    expect(chevronIcon.getAttribute("height")).toBe("14");
  });
});
