import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ShoppingBag, Utensils, Car, Film } from "lucide-react";

interface Category {
  name: string;
  amount: number;
  limit: number;
  color: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { 
    name: "Food & Dining", 
    amount: 450, 
    limit: 600, 
    color: "bg-blue-500", 
    icon: <Utensils size={16} className="text-blue-500" />
  },
  { 
    name: "Transportation", 
    amount: 200, 
    limit: 300, 
    color: "bg-green-500", 
    icon: <Car size={16} className="text-green-500" />
  },
  { 
    name: "Entertainment", 
    amount: 150, 
    limit: 200, 
    color: "bg-purple-500", 
    icon: <Film size={16} className="text-purple-500" />
  },
  { 
    name: "Utilities", 
    amount: 300, 
    limit: 400, 
    color: "bg-yellow-500", 
    icon: <CreditCard size={16} className="text-yellow-500" />
  },
  { 
    name: "Shopping", 
    amount: 500, 
    limit: 800, 
    color: "bg-pink-500", 
    icon: <ShoppingBag size={16} className="text-pink-500" />
  },
];

const ExpenseBreakDown = () => {
  const totalSpent = categories.reduce((sum, category) => sum + category.amount, 0);
  const totalLimit = categories.reduce((sum, category) => sum + category.limit, 0);
  const overallPercentage = Math.min((totalSpent / totalLimit) * 100, 100);

  return (
    <Card className="!shadow-none border-1 border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Expenses Breakdown</CardTitle>
        <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
          <span>${totalSpent.toLocaleString()} spent</span>
          <span>{Math.round(overallPercentage)}% of budget</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 mt-2">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              amount={category.amount}
              limit={category.limit}
              color={category.color}
              icon={category.icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CategoryItem = ({
  name,
  amount,
  limit,
  color,
  icon,
}: {
  name: string;
  amount: number;
  limit: number;
  color: string;
  icon: React.ReactNode;
}) => {
  const percentage = Math.min((amount / limit) * 100, 100);
  const isNearLimit = percentage >= 80;
  const statusColor = percentage >= 90 ? "text-red-500" : percentage >= 75 ? "text-amber-500" : "text-green-500";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center bg-${color.split('-')[1]}-50`}
          >
            {icon}
          </div>
          <div>
            <div className="text-sm font-medium">{name}</div>
            <div className="text-muted-foreground text-xs">
              ${amount.toLocaleString()} of ${limit.toLocaleString()}
            </div>
          </div>
        </div>
        <div className={`text-sm font-medium ${statusColor}`}>{Math.round(percentage)}%</div>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full">
        <div
          className={`h-1.5 rounded-full ${color} ${isNearLimit ? 'animate-pulse' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ExpenseBreakDown;
