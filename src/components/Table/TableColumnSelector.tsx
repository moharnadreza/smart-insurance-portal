import { ViewColumnsIcon } from "@heroicons/react/16/solid";
import type { Table } from "@tanstack/react-table";

type Props = {
  table: Table<Record<string, string>>;
};

const TableColumnsDropdown = ({ table }: Props) => {
  return (
    <div className="relative group">
      <div className="flex gap-2 items-center bg-gray-50 border border-b-0 md:border border-gray-200 px-4 py-2 rounded-md rounded-b-none md:rounded-md group-hover:rounded-b-none cursor-pointer">
        <ViewColumnsIcon width={14} height={14} />
        <span className="font-medium text-xs">Columns</span>
      </div>

      <div className="grid grid-cols-2 md:hidden group-hover:flex flex-col relative md:absolute right-0 top-0 md:top-[33px] min-w-full md:min-w-36 rounded-md rounded-t-none md:rounded-md md:rounded-tr-none divide-gray-200 divide-y bg-gray-50 border border-gray-200 z-10">
        {table.getAllLeafColumns().map((column) => {
          return (
            <label
              key={column.id}
              className="text-xs flex items-center gap-2 cursor-pointer px-4 py-2 md:py-3"
            >
              <input
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{" "}
              {column.id}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export { TableColumnsDropdown };
