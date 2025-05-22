import { Link } from "react-router-dom"
import TransactionTable from "@/components/transaction/transaction-table"
import { Button } from "@/components/ui/button"
import { Card,CardAction,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PROTECTED_ROUTES } from "@/routes/common/routePath"

const DashboardRecentTransactions = () => {
  return (
    <Card className="!shadow-none border-1 border-gray-100 dark:border-border">
    <CardHeader className="!pb-0">
      <CardTitle className="text-xl">Recent Transactions</CardTitle>
      <CardDescription>Showing all recent transactions</CardDescription>
      <CardAction>
        <Button asChild variant="link" className="!text-gray-700 dark:!text-gray-200 !font-normal">
            <Link to={PROTECTED_ROUTES.TRANSACTIONS}>View all</Link>
        </Button>
      </CardAction>
      <Separator className="mt-3 !bg-gray-100 dark:!bg-gray-800" />
      </CardHeader>
      <CardContent className="pt-0">
        <TransactionTable 
        pageSize={5}
        isShowPagination={false} />
      </CardContent>
    </Card>
  )
}

export default DashboardRecentTransactions