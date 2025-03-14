import classNames from "classnames";
import type { InputWrapperProps } from "./types";

const InputWrapper = ({
  children,
  name,
  label,
  error,
  isRequired,
  isDisabled = false,
  isHidden = true,
}: InputWrapperProps) => {
  const className = classNames("relative", {
    "cursor-not-allowed select-none": isDisabled,
  });

  if (isHidden) return null;

  return (
    <div className={className}>
      {label && (
        <label
          title={label}
          className="block text-xs mb-1 ms-1 truncate"
          htmlFor={name}
        >
          {label}
          {isRequired && <sup>&nbsp;*</sup>}
        </label>
      )}

      {children}

      {error && (
        <span
          className="text-red-500 ms-1 text-xs break-words"
          data-testid={`${name}-error`}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export { InputWrapper };
