import { ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  onClick: () => void;
  label: string;
  index: number;
};

const InsuranceCard = ({ label, onClick, index }: Props) => {
  return (
    <div
      {...{ onClick }}
      role="button"
      className="group relative cursor-pointer overflow-hidden px-4 py-3 flex flex-col items-start justify-start rounded-xl bg-gray-50 hover:bg-gray-100 transition-color duration-150"
    >
      <span className="absolute font-black text-gray-100 text-[8rem] left-2 -top-6">
        {index}
      </span>
      <span className="font-medium text-sm z-10">{label}</span>
      <div className="p-2 rounded-lg border-1 border-gray-200 group-hover:bg-gray-200 self-end">
        <ChevronRightIcon width={14} height={14} />
      </div>
    </div>
  );
};

export { InsuranceCard };
