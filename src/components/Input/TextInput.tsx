import classNames from "classnames";
import type { Ref } from "react";
import type { CommonInputProps } from "./types";
import { InputWrapper } from "./Wrapper";

type Props = { ref: Ref<HTMLInputElement> } & CommonInputProps;

const TextInput = ({
  ref,
  placeholder,
  label,
  isRequired,
  error,
  name,
  isDisabled,
}: Props) => {
  const className = classNames(
    [
      "w-full px-3 py-2 text-sm rounded-lg border-1 border-gray-200",
      "transition-colors duration-50 ease-out",
      "placeholder:text-gray-300 placeholder:text-sm focus:outline-none focus:border-gray-500",
    ],
    {
      "pointer-events-none bg-gray-100": isDisabled,
      "border-red-500 focus:border-red-500": error,
    }
  );

  return (
    <InputWrapper {...{ name, error, label, isDisabled, isRequired }}>
      <input
        type="text"
        {...{ name, ref, placeholder }}
        className={className}
      />
    </InputWrapper>
  );
};

export { TextInput };
