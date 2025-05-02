import DashboardHeader from "./_component/dashboard-header";
import DashboardStats from "./_component/dashboard-stats";

const DashboardSummary = () => {
  return (
      <div className="w-full">
        <DashboardHeader
          title="Welcome back, Alex"
          subtitle="This is your overview report for the month"
        />
        <DashboardStats />
      </div>
  );
};

export default DashboardSummary;