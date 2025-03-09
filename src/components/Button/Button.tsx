import type { ReactElement } from "react";
import { cloneElement } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

type Props = {
  label: string;
  icon: ReactElement;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  isDisabled?: boolean;
};

/**
 * ensure that the provided icon is always at the same size
 */
const IconComponent = ({ icon }: Pick<Props, "icon">) =>
  cloneElement(icon, { width: 14, height: 14 } as never);

const Button = ({
  label,
  onClick,
  icon,
  type = "button",
  isLoading = false,
  isDisabled = false,
}: Props) => {
  return (
    <button
      {...{ onClick, type, disabled: isDisabled || isLoading }}
      className="w-full px-6 py-3 text-sm cursor-pointer rounded-lg overflow-hidden inline-flex items-center justify-center gap-1.5 transition-colors duration-100 ease-in-out text-white bg-gray-900 hover:bg-gray-950 ring-3 focus:ring-gray-200 disabled:bg-gray-700"
    >
      {isLoading ? <LoadingIndicator /> : <IconComponent {...{ icon }} />}
      {label}
    </button>
  );
};

export { Button };
