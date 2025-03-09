import classNames from "classnames";
import type { Ref } from "react";
import type { CommonInputProps } from "./types";
import { InputWrapper } from "./Wrapper";

type Props = {
  ref: Ref<HTMLInputElement>;
  currency?: string;
} & CommonInputProps;

const CurrencyInput = ({
  label,
  isRequired,
  error,
  placeholder,
  name,
  isDisabled,
  currency = "USD",
  ...restProps
}: Props) => {
  const className = classNames(
    [
      "w-full ps-3 pe-10 py-2 text-sm bg-none appearance-none rounded-lg border-1 border-gray-200",
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
      <div className="relative flex items-center">
        <input
          type="number"
          {...{ name, placeholder }}
          {...restProps}
          className={className}
        />

        <div
          className={classNames(
            "absolute flex items-center justify-center gap-1 right-2.5 select-none -z-2",
            { "z-0": isDisabled }
          )}
        >
          <span className="text-xs text-gray-800">{currency}</span>
        </div>
      </div>
    </InputWrapper>
  );
};

export { CurrencyInput };
