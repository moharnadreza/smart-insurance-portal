import { ViewColumnsIcon } from "@heroicons/react/16/solid";
import type { Table } from "@tanstack/react-table";

type Props = {
  table: Table<Record<string, string>>;
};

const TableColumnsDropdown = ({ table }: Props) => {
  return (
    <div className="relative group pb-1">
      <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 px-4 py-2 rounded-md cursor-pointer">
        <ViewColumnsIcon width={14} height={14} />
        <span className="font-medium text-xs">Columns</span>
      </div>

      <div className="hidden group-hover:flex flex-col absolute right-0 top-full min-w-36 rounded-md divide-gray-200 divide-y bg-gray-50 border border-gray-200">
        {table.getAllLeafColumns().map((column) => {
          return (
            <label
              key={column.id}
              className="text-xs flex items-center gap-2 cursor-pointer px-4 py-3"
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
