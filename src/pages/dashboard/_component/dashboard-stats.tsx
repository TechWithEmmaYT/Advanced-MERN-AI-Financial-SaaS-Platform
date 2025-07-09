import SummaryCard from "./summary-card";
import { DateRangeType } from "@/components/date-range-select";

const DashboardStats = ({ dateRange }: { dateRange?: DateRangeType }) => {

  // const { data, isFetching } = useSummaryAnalyticsQuery(
  //   { preset: dateRange?.value },
  //   { skip: !dateRange }
  // );
  // const summaryData = data?.data;
  
  return (
    <div className="flex flex-row items-center">
      <div className="flex-1 lg:flex-[1] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Available Balance"
          value={15230.75}
          dateRange={dateRange}
          percentageChange={0}
          isLoading={false}
          cardType="balance"
        />
        <SummaryCard
          title="Total Income"
          value={25300.5}
          percentageChange={12.8}
          dateRange={dateRange}
          isLoading={false}
          cardType="income"
        />
        <SummaryCard
          title="Total Expenses"
          value={10069.75}
          dateRange={dateRange}
          percentageChange={3.5}
          isLoading={false}
          cardType="expenses"
        />
        <SummaryCard
          title="Savings Rate"
          value={19}
          expenseRatio={75}
          isPercentageValue
          dateRange={dateRange}
          isLoading={false}
          cardType="savings"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
