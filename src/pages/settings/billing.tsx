import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckIcon, CreditCard } from "lucide-react"

const Billing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>
      <Separator />
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Free Trial</CardTitle>
            <CardDescription>You are currently on the Free plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Monthly Subscription</div>
              <div className="text-xl font-bold">$0.00</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Next billing date</div>
              <div className="text-sm">N/A</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Payment method</div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4" />
                Not added
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Payment Method</Button>
          </CardFooter>
        </Card>

        {/* Upgrade Options */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pro Plan</CardTitle>
              {/* <Badge className="bg-primary">Recommended</Badge> */}
            </div>
            <CardDescription>Upgrade to unlock premium features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Monthly Subscription</div>
              <div className="text-xl font-bold">$9.99</div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span>Unlimited transactions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span>Export reports</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Upgrade Now</Button>
          </CardFooter>
        </Card>
      </div>
{/* 
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View your past invoices and payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-sm text-muted-foreground">
              No billing history available
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}

export default Billing