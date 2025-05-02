import SummaryCard from "./summary-card";

const DashboardStats = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex-1 lg:flex-[1] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Available Balance"
          value={15230.75}
          dateRange="Aug 24 - 25"
          percentageChange={5.2}
        />
        <SummaryCard
          title="Total Income"
          value={25300.5}
          percentageChange={12.8}
          dateRange="Aug 24 - 25, 2024"
        />
        <SummaryCard
          title="Total Expenses"
          value={10069.75}
          dateRange="Aug 24 - 25"
          percentageChange={-3.5}
        />
         <SummaryCard
          title="Savings Rate"
          value={19}
          isPercentageValue
          dateRange="Aug 24 - 25"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
