import SummaryCard from "./summary-card";
import { DateRangeType } from "@/components/date-range-select";

const DashboardStats = ({dateRange}: {dateRange?: DateRangeType}) => {
  const dateRangeLabel = dateRange?.label || "";
  return (
    <div className="flex flex-row items-center">
      <div className="flex-1 lg:flex-[1] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Available Balance"
          value={15230.75}
          dateRange={dateRangeLabel}
          percentageChange={5.2}
        />
        <SummaryCard
          title="Total Income"
          value={25300.5}
          percentageChange={12.8}
          dateRange={dateRangeLabel}
        />
        <SummaryCard
          title="Total Expenses"
          value={10069.75}
          dateRange={dateRangeLabel}
          percentageChange={-3.5}
        />
         <SummaryCard
          title="Savings Rate"
          value={19}
          isPercentageValue
          dateRange={dateRangeLabel}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
