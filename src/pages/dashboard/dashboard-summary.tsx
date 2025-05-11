import DashboardHeader from "./_component/dashboard-header";
import DashboardStats from "./_component/dashboard-stats";
import { DateRangeType } from "@/components/date-range-select";

const DashboardSummary = ({dateRange, setDateRange}: {dateRange?: DateRangeType; setDateRange?: (range: DateRangeType) => void}) => {
  return (
      <div className="w-full">
        <DashboardHeader
          title="Welcome back, Alex"
          subtitle="This is your overview report for the month"
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <DashboardStats 
        dateRange={dateRange}
        />
      </div>
  );
};

export default DashboardSummary;