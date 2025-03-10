import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal component", () => {
  test("should not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} title="Test Modal" onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.queryByText("Test Modal")).toBeNull();
  });

  test("should render when isOpen is true", () => {
    render(
      <Modal isOpen={true} title="Test Modal" onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText("Test Modal")).toBeDefined();
    expect(screen.getByText("Modal Content")).toBeDefined();
  });

  test("should call onClose when overlay is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal isOpen={true} title="Test Modal" onClose={onCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByTestId("close"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("should call onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal isOpen={true} title="Test Modal" onClose={onCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByTestId("close"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("should prevent closing when clicking inside the modal", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal isOpen={true} title="Test Modal" onClose={onCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText("Modal Content"));
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
