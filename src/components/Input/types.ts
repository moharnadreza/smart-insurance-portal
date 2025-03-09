import type { ReactNode } from "react";

type InputWrapperProps = {
  name: string;
  children: ReactNode;
  error?: string;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
};

type CommonInputProps = {
  placeholder?: string;
} & Omit<InputWrapperProps, "children">;

export type { CommonInputProps, InputWrapperProps };
