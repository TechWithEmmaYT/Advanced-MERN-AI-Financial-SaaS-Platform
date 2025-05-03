import {
  Card,
  CardContent,
} from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import AddTransactionDrawer from "@/components/transaction/add-transaction-drawer";
import TransactionTable from "@/components/transaction/transaction-table";
import { Button } from "@/components/ui/button";
import { ImportIcon } from "lucide-react";
import { toast } from "sonner";

export default function Transactions() {

  const handleBulkImport = () => {
    toast.info("Bulk import is for premium users only, link in the video description");
  }

  return (
    <PageLayout
      title="All Transactions"
      subtitle="Showing all transactions"
      addMarginTop
      rightAction={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="!shadow-none !cursor-pointer !border-gray-500 !text-white !bg-transparent"
            onClick={handleBulkImport}
          >
            <ImportIcon className="!w-5 !h-5" />
            Bulk Import
          </Button>
          <AddTransactionDrawer />
        </div>
      }
    >
      <Card className="border-0 shadow-none">
        <CardContent className="pt-2">
          <TransactionTable />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
