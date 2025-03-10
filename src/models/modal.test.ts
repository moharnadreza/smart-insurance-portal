import { act, renderHook } from "@testing-library/react";
import { useModal } from "./modal";

describe("useModal store", () => {
  test("should initialize with default values", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.activeFormId).toBeUndefined();
  });

  test("should open modal with correct form id", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.open({ id: "form123" });
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.activeFormId).toBe("form123");
  });

  test("should close modal and reset activeFormId", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.open({ id: "form123" });
    });

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.activeFormId).toBeUndefined();
  });
});
