import classNames from "classnames";
import type { Ref } from "react";
import type { CommonInputProps } from "./types";
import { InputWrapper } from "./Wrapper";

type Props = {
  ref: Ref<HTMLInputElement>;
} & CommonInputProps;

const DateInput = ({
  label,
  isRequired,
  error,
  placeholder,
  name,
  isDisabled,
  isHidden,
  ...restProps
}: Props) => {
  const className = classNames(
    [
      "w-full ps-3 pe-1.5 py-2 text-sm bg-none appearance-none rounded-lg border-1 border-gray-200",
      "transition-colors duration-50 ease-out",
      "placeholder:text-gray-300 placeholder:text-sm focus:outline-none focus:border-gray-500",
    ],
    {
      "pointer-events-none bg-gray-100": isDisabled,
      "border-red-500 focus:border-red-500": error,
    }
  );

  return (
    <InputWrapper {...{ name, error, label, isDisabled, isRequired, isHidden }}>
      <input
        type="date"
        {...{ name, placeholder }}
        {...restProps}
        className={className}
      />
    </InputWrapper>
  );
};

export { DateInput };
