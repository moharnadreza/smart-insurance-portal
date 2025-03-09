import { XMarkIcon } from "@heroicons/react/16/solid";
import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, title, onClose, children }: Props) => {
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
        className="bg-white p-6 rounded-2xl max-w-xl w-full space-y-6"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold">{title}</h4>
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 cursor-pointer"
            onClick={onClose}
          >
            <XMarkIcon width={14} height={14} />
          </button>
        </div>
        <div className="min-h-36 max-h-[80vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export { Modal };
