import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "components/Button";
import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, title, description, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      role="button"
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-stone-950/80 transition-all"
    >
      <div
        role="button"
        onClick={(event) => {
          /**
           * to prevent triggering the `onClick` event of the parent element
           */
          if (event && event.stopPropagation) event.stopPropagation();
        }}
        className="bg-white p-6 rounded-2xl max-w-lg w-full space-y-6"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold">{title}</h4>
          <span className="text-sm text-gray-800">{description}</span>
        </div>
        <div className="min-h-36">{children}</div>
        <div className="flex justify-end">
          <Button
            icon={<ArrowUturnLeftIcon />}
            label="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
