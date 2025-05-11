import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DateRangeType } from "@/components/date-range-select";
import { formatCurrency } from "@/lib/format-currency";
//import { formatCurrency } from "@/lib/format-currency"

interface Category {
  name: string;
  amount: number;
}

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"]

const categories: Category[] = [
  { 
    name: "Food & Dining", 
    amount: 450, 
  },
  { 
    name: "Rent", 
    amount: 500, 
  },
  { 
    name: "Utilities", 
    amount: 300, 
  },
  { 
    name: "Others", 
    amount: 100, 
  },
];

// Create chart config for shadcn UI chart
const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig

const ExpensePieChart = (props: {dateRange?: DateRangeType}) => {
  const {dateRange} = props
  const totalSpent = React.useMemo(() => {
    return categories.reduce((sum, category) => sum + category.amount, 0)
  }, [])
  
  // Format data for pie chart
  const pieData = React.useMemo(() => {
    return categories.map(category => ({
      name: category.name,
      value: category.amount,
      percentage: Math.round((category.amount / totalSpent) * 100)
    }))
  }, [totalSpent])

 // // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const CustomTooltip = ({  payload }: any) => {
//     if (payload.length) {
//       const data = payload[0];
//       return (
//         <div className="">
//           <div className="flex items-center gap-2 mb-1">
//             <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }}></div>
//             <p className="font-medium">{data.name}</p>
//           </div>
//           <p className="text-muted-foreground text-sm">${data.value.toLocaleString()}</p>
//         </div>
//       );
//     }
//     return null;
//   };

  // Custom legend component
  const CustomLegend = () => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 mt-4">
        {pieData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <div className="flex justify-between w-full">
              <span className="text-xs font-medium truncate">{entry.name}</span>
              <span className="text-xs text-muted-foreground">{formatCurrency(entry.value)}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="!shadow-none border-1 border-gray-100 dark:border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Expenses Breakdown</CardTitle>
        <CardDescription>Total expenses {dateRange?.label}</CardDescription>
      </CardHeader>
      <CardContent className="h-[313px]">
        <div className=" w-full">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent 
                  //labelFormatter={(_, payload) => CustomTooltip({payload})}
                  indicator="dot"
                  />
                }
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                strokeWidth={2}
                stroke="#fff"
              >
                {pieData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            ${totalSpent.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-muted-foreground text-xs"
                          >
                            Total Spent
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
             <ChartLegend content={<CustomLegend />} />
            </PieChart>
            
          </ChartContainer>
        </div>
      </CardContent>

    </Card>
  )
}

export default ExpensePieChart