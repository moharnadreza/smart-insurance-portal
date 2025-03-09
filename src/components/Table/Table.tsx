"use client";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import {
  type ColumnOrderState,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useState } from "react";

type Props = {
  columns?: Array<string>;
  data?: Array<Record<string, string>>;
};

const Table = ({ columns, data }: Props) => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns:
      columns?.map((column) => ({
        accessorKey: column,
        header: () => column,
      })) || [],
    state: {
      columnVisibility,
      columnOrder,
      pagination,
      sorting,
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div>
      <div className="flex flex-col items-end gap-2 mb-4">
        <span className="font-medium text-xs">Columns:</span>
        <div className="flex gap-2">
          {table.getAllLeafColumns().map((column) => {
            return (
              <div key={column.id} className="px-1">
                <label className="text-xs flex items-center gap-1">
                  <input
                    className="bg-gray-200"
                    {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{" "}
                  {column.id}
                </label>
              </div>
            );
          })}
        </div>
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
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon width={14} height={14} />
          </button>
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon width={14} height={14} />
          </button>
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon width={14} height={14} />
          </button>
          <button
            className="appearance-none p-2 rounded-lg border-1 border-gray-200 hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
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

export { Table };
