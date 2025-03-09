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
      {...{ onClick, type, disabled: isDisabled }}
      className="px-3 py-2 text-xs cursor-pointer rounded-lg overflow-hidden inline-flex items-center justify-center gap-2 transition-colors duration-100 ease-in-out text-white bg-gray-900 hover:bg-gray-950 ring-3 focus:ring-gray-200"
    >
      {isLoading ? <LoadingIndicator /> : <IconComponent {...{ icon }} />}
      {label}
    </button>
  );
};

export { Button };
