import { ImportIcon } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import AddTransactionDrawer from "@/components/transaction/add-transaction-drawer";
import TransactionTable from "@/components/transaction/transaction-table";

export default function Transactions() {

  return (
    <PageLayout
      title="All Transactions"
      subtitle="Showing all transactions"
      addMarginTop
      rightAction={
        <div className="flex items-center gap-2">
           <Button variant="outline" className="!shadow-none !cursor-pointer  !border-gray-500 !text-white !bg-transparent">
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
