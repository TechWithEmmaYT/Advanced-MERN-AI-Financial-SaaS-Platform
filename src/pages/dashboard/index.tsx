import DashboardDataChart from "./dashboard-data-chart";
import DashboardSummary from "./dashboard-summary";
import PageLayout from "@/components/page-layout";
//import ExpenseBreakDown from "./expense-breakdown";
import ExpensePieChart from "./expense-pie-chart";
import DashboardRecentTransactions from "./dashboard-recent-transactions";

const Dashboard = () => {

  const sampleData = [
    { date: "2024-04-01", income: 1200, expenses: 1450 },
    { date: "2024-04-02", income: 970, expenses: 1280 },
    { date: "2024-04-03", income: 1670, expenses: 1920 },
    { date: "2024-04-04", income: 2420, expenses: 2760 },
    { date: "2024-04-05", income: 1730, expenses: 2190 },
    { date: "2024-04-06", income: 1301, expenses: 1840 },
    { date: "2024-04-07", income: 2450, expenses: 2680 },
    { date: "2024-04-08", income: 1409, expenses: 1820 },
    { date: "2024-04-09", income: 1590, expenses: 2110 },
    { date: "2024-04-10", income: 1261, expenses: 1790 },
    { date: "2024-04-11", income: 1327, expenses: 1850 },
    { date: "2024-04-12", income: 1292, expenses: 1710 },
    { date: "2024-04-13", income: 1342, expenses: 1880 },
    { date: "2024-04-14", income: 1137, expenses: 1520 },
    { date: "2024-04-15", income: 1120, expenses: 1570 },
    { date: "2024-04-16", income: 1380, expenses: 1990 },
    { date: "2024-04-17", income: 1446, expenses: 2160 },
    { date: "2024-04-18", income: 1364, expenses: 1910 },
    { date: "2024-04-19", income: 1243, expenses: 1780 },
    { date: "2024-04-20", income: 1089, expenses: 1550 },
    { date: "2024-04-21", income: 1137, expenses: 1600 },
    { date: "2024-04-22", income: 1224, expenses: 1670 },
    { date: "2024-04-23", income: 1138, expenses: 1630 },
    { date: "2024-04-24", income: 1387, expenses: 1890 },
    { date: "2024-04-25", income: 1215, expenses: 1750 },
    { date: "2024-04-26", income: 1075, expenses: 1530 },
    { date: "2024-04-27", income: 1383, expenses: 1920 },
    { date: "2024-04-28", income: 1122, expenses: 1680 },
    { date: "2024-04-29", income: 1315, expenses: 1840 },
    { date: "2024-04-30", income: 1454, expenses: 2180 },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Dashboard Summary Overview */}
      <PageLayout className="space-y-6"
          renderPageHeader={<DashboardSummary />}
      >
        {/* Dashboard Main Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-4">
            <DashboardDataChart data={sampleData} />
          </div>
          <div className="lg:col-span-2">
            <ExpensePieChart />
          </div>
        </div>
        {/* Dashboard Recent Transactions */}
        <div className="w-full mt-0">
          <DashboardRecentTransactions />
        </div>
      </PageLayout>
    </div>
  );
};

export default Dashboard;
