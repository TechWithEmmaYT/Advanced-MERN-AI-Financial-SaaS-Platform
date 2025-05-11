import { useEffect, useState } from "react";
import {
  format,
  subDays,
  subMonths,
  subYears,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export type DateRangeType = {
  from: Date | null;
  to: Date | null;
  value?: string;
  label: string;
} | null;

type DateRangePreset = {
  label: string;
  value: string;
  getRange: () => DateRangeType;
};

interface DateRangeSelectProps {
  dateRange: DateRangeType;
  setDateRange: (range: DateRangeType) => void;
  defaultRange?: "30days" | "thisMonth";
}

const presets: DateRangePreset[] = [
  {
    label: "Last 30 Days",
    value: "30days",
    getRange: () => ({
      from: subDays(new Date(), 30),
      to: new Date(),
      value: "30days",
      label: "for Past 30 Days",
    }),
  },
  {
    label: "Last Month",
    value: "lastMonth",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: startOfMonth(new Date()),
      value: "lastMonth",
      label: "for Last Month",
    }),
  },
  {
    label: "Last 3 Months",
    value: "last3Months",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 3)),
      to: startOfMonth(new Date()),
      value: "last3Months",
      label: "for Past 3 Months",
    }),
  },
  {
    label: "Last Year",
    value: "lastYear",
    getRange: () => ({
      from: startOfYear(subYears(new Date(), 1)),
      to: startOfYear(new Date()),
      value: "lastYear",
      label: "for Past Year",
    }),
  },
  {
    label: "This Month",
    value: "thisMonth",
    getRange: () => ({
      from: startOfMonth(new Date()),
      to: new Date(),
      value: "thisMonth",
      label: "for This Month",
    }),
  },
  {
    label: "This Year",
    value: "thisYear",
    getRange: () => ({
      from: startOfYear(new Date()),
      to: new Date(),
      value: "thisYear",
      label: "for This Year",

    }),
  },
  {
    label: "All Time",
    value: "allTime",
    getRange: () => ({
      from: null,
      to: null,
      value: "allTime",
      label: "across All Time",
    }),
  },
];

export const DateRangeSelect = ({
  dateRange,
  setDateRange,
  defaultRange = "30days",
}: DateRangeSelectProps) => {
  const [open, setOpen] = useState(false);

  const displayText = dateRange
    ? presets.find((p) => p.value === dateRange.value)?.label ||
      (dateRange.from
        ? `${format(dateRange.from, "MMM dd, y")} - ${
            dateRange.to ? format(dateRange.to, "MMM dd, y") : "Present"
          }`
        : "Select a duration")
    : "Select a duration";

      // Set default range on initial render
  useEffect(() => {
    if (!dateRange) {
      const defaultPreset = presets.find(p => p.value === defaultRange);
      if (defaultPreset) {
        console.log(defaultPreset.getRange(),"defaultPreset.getRange()")
        setDateRange(defaultPreset.getRange());
      }
    }
  }, [dateRange, defaultRange, setDateRange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            `w-[200px] flex items-center justify-between text-left font-normal !bg-[var(--secondary-dark-color)]
            border-gray-700 !text-white !cursor-pointer`,
            !dateRange && "text-muted-foreground"
          )}
        >
          {displayText}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="grid py-1">
          {presets.map((preset) => (
            <Button
              key={preset.value}
              variant="ghost"
              className={cn(
                "justify-start text-left",
                dateRange?.value === preset.value && "bg-accent"
              )}
              onClick={() => {
                setDateRange(preset.getRange());
                setOpen(false);
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
