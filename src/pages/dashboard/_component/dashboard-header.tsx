import { DateRangeSelect, DateRangeType } from "@/components/date-range-select";
import AddTransactionDrawer from "@/components/transaction/add-transaction-drawer";
import { useState } from "react";

interface Props {
  title: string;
  subtitle: string;
}

const DashboardHeader = ({ title, subtitle }: Props) => {
  const [dateRange, _setDateRange] = useState<DateRangeType>(null);
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between space-y-7">
      <div className="space-y-1">
        <h2 className="text-2xl lg:text-4xl font-medium">{title}</h2>
        <p className="text-white/60 text-sm">{subtitle}</p>
      </div>
      <div className="flex justify-end gap-4 mb-6">
      <DateRangeSelect dateRange={dateRange} setDateRange={(range) => _setDateRange(range)} />
        <AddTransactionDrawer />
      </div>
    </div>
  );
};

export default DashboardHeader;
