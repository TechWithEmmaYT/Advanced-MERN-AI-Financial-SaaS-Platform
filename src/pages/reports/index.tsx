import {
  Card,
  CardContent,
} from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import ScheduleReportDrawer from "./_component/schedule-report-drawer";
import ReportTable from "./_component/report-table";


export default function Reports() {
 
  return (
    <PageLayout
      title="Report History"
      subtitle="View and manage your financial reports"
      addMarginTop
      rightAction={
        <ScheduleReportDrawer />
      }
    >
        <Card className="border shadow-none">
          <CardContent>
           <ReportTable />
          </CardContent>
        </Card>
    </PageLayout>
  );
}
