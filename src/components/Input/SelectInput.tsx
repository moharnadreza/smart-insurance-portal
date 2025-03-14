"use client";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDynamicOptions, type DynamicOptions } from "api";
import classNames from "classnames";
import { LoadingIndicator } from "components/Button";
import { useMemo, type Ref } from "react";
import type { CommonInputProps } from "./types";
import { InputWrapper } from "./Wrapper";

type Option = { label: string; value: string };

type Props = {
  ref: Ref<HTMLSelectElement>;
  options?: Array<Option>;
  dynamicOptions?: DynamicOptions;
  formValues?: { [x: string]: string | number };
} & Omit<CommonInputProps, "placeholder">;

const SelectInput = ({
  name,
  options,
  dynamicOptions,
  formValues,
  label,
  error,
  isRequired,
  isDisabled,
  isHidden,
  ...restProps
}: Props) => {
  const { isLoading, data } = useDynamicOptions({
    key: dynamicOptions
      ? `${dynamicOptions.endpoint}?${dynamicOptions.dependsOn}=${
          formValues?.[dynamicOptions?.dependsOn as string] as string
        }`
      : null,
    path: dynamicOptions ? dynamicOptions.endpoint : null,
    country:
      (formValues?.[dynamicOptions?.dependsOn as string] as string) ?? "",
  });

  const selectOptions = useMemo(() => {
    return dynamicOptions
      ? data?.states.map((state) => ({ label: state, value: state }))
      : options;
  }, [data?.states, dynamicOptions, options]);

  const className = classNames(
    [
      "w-full ps-3 pe-6 py-2 text-sm bg-none appearance-none rounded-lg border-1 border-gray-200",
      "transition-colors duration-50 ease-out",
      "placeholder:text-gray-300 placeholder:text-sm focus:outline-none focus:border-gray-500",
    ],
    {
      "pointer-events-none bg-gray-100": isDisabled || isLoading,
      "border-red-500 focus:border-red-500": error,
    }
  );

  return (
    <InputWrapper {...{ name, error, label, isRequired, isDisabled, isHidden }}>
      <div className="relative flex items-center">
        <select {...{ name, id: name }} {...restProps} className={className}>
          <option disabled selected value="">
            Select
          </option>

          {selectOptions?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <div
          className={classNames(
            "absolute flex items-center justify-center gap-1 right-2 select-none z-2",
            { "z-0": isDisabled || isLoading }
          )}
        >
          {isLoading && <LoadingIndicator />}
          <ChevronDownIcon width={14} height={14} />
        </div>
      </div>
    </InputWrapper>
  );
};

export { SelectInput };
