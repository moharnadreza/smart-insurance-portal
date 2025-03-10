"use client";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  type ColumnOrderState,
  type FilterFn,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { TableColumnsDropdown } from "./TableColumnSelector";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type Props = {
  columns?: Array<string>;
  data?: Array<Record<string, string>>;
};

/**
 * custom fuzzy filter function to apply ranking info to rows
 */
const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });
  return itemRank.passed;
};

const Table = ({ columns, data }: Props) => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: data ?? [],
    columns:
      columns?.map((column) => ({
        accessorKey: column,
        header: () => column,
      })) || [],
    filterFns: { fuzzy: fuzzyFilter },
    state: {
      columnVisibility,
      columnOrder,
      pagination,
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flex justify-between gap-2 mb-4">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />
        <TableColumnsDropdown {...{ table }} />
      </div>

      <table className="min-w-full bg-gray-50 rounded-2xl">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className={classNames(
                    "px-5 pt-6 pb-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    { "cursor-pointer select-none": header.column.getCanSort() }
                  )}
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === "asc"
                        ? "Sort ascending"
                        : header.column.getNextSortingOrder() === "desc"
                        ? "Sort descending"
                        : "Clear sort"
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-5 py-4 whitespace-nowrap text-sm font-medium"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center font-bold gap-1 text-xs ms-1">
            {`Page ${table.getState().pagination.pageIndex + 1} of ${table
              .getPageCount()
              .toLocaleString()}`}
          </span>
          <select
            className="appearance-none outline-0 text-xs"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[1, 5, 10, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-45"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon width={14} height={14} />
          </button>
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-45"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon width={14} height={14} />
          </button>
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-45"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon width={14} height={14} />
          </button>
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-45"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRightIcon width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      className="w-full md:w-1/2 px-3 py-2 text-xs rounded-lg border-1 border-gray-200 transition-colors duration-50 ease-out placeholder:text-gray-300 placeholder:text-xs focus:outline-none focus:border-gray-500"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export { Table };
