import {
  ArrowUpDown,
  CircleDot,
  Copy,
  MoreHorizontal,
  Pencil,
  RefreshCw,
  StopCircleIcon,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TransactionFrequencyType,
  TransactionStatusType,
  _TRANSACTION_FREQUENCY,
  _TRANSACTION_TYPE,
  _TransactionType,
} from "@/constant";
import { formatCurrency } from "@/lib/format-currency";

export type TransactionType = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: _TransactionType;
  category: string;
  status?: TransactionStatusType;
  frequency: TransactionFrequencyType;
  nextOccurrence?: Date;
};

export const transactionColumns: ColumnDef<TransactionType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="!border-black data-[state=checked]:!bg-gray-800 !text-white"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="!border-black data-[state=checked]:!bg-gray-800 !text-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => format(row.getValue("date"), "MMM dd, yyyy"),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.getValue("type") === _TRANSACTION_TYPE.INCOME
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("type")}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.getValue("type");

      return (
        <div
          className={`text-right font-medium ${
            type === _TRANSACTION_TYPE.INCOME ? "text-green-600" : "text-destructive"
          }`}
        >
          {type === _TRANSACTION_TYPE.EXPENSE ? "-" : "+"}
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "frequency",
    header: "Schedule",
    cell: ({ row }) => {
      const frequency = row.getValue("frequency");
      const nextDate = row.original?.nextOccurrence;

      const frequencyMap = {
        ONE_TIME: { label: "One-time", icon: CircleDot },
        DAILY: { label: "Daily", icon: RefreshCw },
        WEEKLY: { label: "Weekly", icon: RefreshCw },
        MONTHLY: { label: "Monthly", icon: RefreshCw },
        YEARLY: { label: "Yearly", icon: RefreshCw },
      };

      const { label, icon: Icon } =
        frequencyMap[frequency as keyof typeof frequencyMap];

      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span>{label}</span>
            {nextDate && frequency !== _TRANSACTION_FREQUENCY.ONE_TIME && (
              <span className="text-xs text-muted-foreground">
                Next: {format(nextDate, "MMM dd")}
              </span>
            )}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;
      const isRecurring = transaction.frequency !== _TRANSACTION_FREQUENCY.ONE_TIME;
      console.log(transaction);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44" align="end">
            <DropdownMenuItem>
              <Pencil className="mr-1 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-1 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            {isRecurring && (
              <>
                <DropdownMenuItem>
                  <StopCircleIcon className="mr-1 h-4 w-4" />
                  Stop Recurring
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="!text-destructive">
              <Trash2 className="mr-1 h-4 w-4 !text-destructive" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
