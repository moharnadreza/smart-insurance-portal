import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders correctly with label and icon", () => {
    render(
      <Button
        label="Click Me"
        icon={<ChevronRightIcon width={14} height={14} />}
      />
    );
    expect(screen.getByText("Click Me")).toBeDefined();
    expect(screen.getByTestId("icon")); // Ensure icon is rendered
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button
        label="Click Me"
        icon={<ChevronRightIcon width={14} height={14} />}
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when isDisabled is true", () => {
    render(
      <Button
        label="Click Me"
        icon={<ChevronRightIcon width={14} height={14} />}
        isDisabled
      />
    );
    expect(screen.getByRole("button").getAttribute("disabled")).toBe("");
  });

  it("disables button when isLoading is true", () => {
    render(
      <Button
        label="Click Me"
        icon={<ChevronRightIcon width={14} height={14} />}
        isLoading
      />
    );
    expect(screen.getByRole("button").getAttribute("disabled")).toBe("");
  });

  it("shows LoadingIndicator when isLoading is true", () => {
    render(
      <Button
        label="Loading"
        icon={<ChevronRightIcon width={14} height={14} />}
        isLoading
      />
    );
    expect(screen.getByTestId("loading-indicator")).toBeDefined();
  });

  it("renders icon with correct size", () => {
    render(
      <Button
        label="Icon Test"
        icon={<ChevronRightIcon width={14} height={14} />}
      />
    );
    const icon = screen.getByTestId("icon");
    expect(icon.getAttribute("width")).toBe("14");
    expect(icon.getAttribute("height")).toBe("14");
  });
});
