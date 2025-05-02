/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { PlusCircleIcon, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchPlaceholder?: string;
  filters?: FilterOption[];
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  onBulkDelete?: (selectedIds: string[]) => void;
  pagination?: boolean;
  selection?: boolean;
}

export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder = "Search...",
  filters = [],
  onSearch,
  onFilterChange,
  onBulkDelete,
  pagination = true,
  selection = true,
}: DataTableProps<TData>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection: selection ? rowSelection : {},
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: selection ? setRowSelection : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelections = selectedRows.length > 0;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...filterValues, [key]: value };
    setFilterValues(updated);
    onFilterChange?.(updated);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilterValues({});
    onSearch?.("");
    onFilterChange?.({});
  };

  const handleDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedIds = selectedRows.map(row => (row.original as any).id);
    onBulkDelete?.(selectedIds);
  };

  return (
    <div className="w-full">
      {/* Top Bar: Search & Filters */}
      <div className="flex flex-wrap justify-between items-center gap-2 pb-4">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {searchPlaceholder && (
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
          )}
          {filters.map(({ key, label, options }) => (
            <Select
              key={key}
              value={filterValues[key] ?? ""}
              onValueChange={(value) => handleFilterChange(key, value)}
            >
              <SelectTrigger className="min-w-[160px]">
              <div className="flex items-center gap-2">
                <PlusCircleIcon className="h-4 w-4 opacity-50" />
                <SelectValue placeholder={label} />
              </div>
              </SelectTrigger>
              <SelectContent>
                {options.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {(searchTerm || Object.keys(filterValues).length > 0) && (
            <Button variant="ghost" onClick={handleClear} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>

        {selection && hasSelections && (
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-1" />
            Delete ({selectedRows.length})
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-muted z-10 ">
            {table.getHeaderGroups().map(group => (
              <TableRow key={group.id}>
                {group.headers.map(header => (
                  <TableHead key={header.id} className="!font-medium !text-[13px]">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="!text-[13.3px]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} items
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
