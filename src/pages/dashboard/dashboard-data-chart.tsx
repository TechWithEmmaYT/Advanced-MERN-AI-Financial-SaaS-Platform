import * as React from "react";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EmptyState } from "@/components/empty-state";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { DateRangeType } from "@/components/date-range-select";

interface PropsType {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
  dateRange?: DateRangeType;
}

const COLORS = ["var(--primary)", "var(--color-destructive)"]
const TRANSACTION_TYPES = ["income","expenses"]


const chartConfig = {
  income: {
    label: "Income",
    color: COLORS[0],
  },
  expenses: {
    label: "Expenses",
    color: COLORS[1]
  },
} satisfies ChartConfig;


const DashboardDataChart: React.FC<PropsType> = (props) => {
  const { data = [], dateRange } = props;
  const isMobile = useIsMobile();

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    }).map(item => ({
      ...item,
      // Format date as YYYY-MM-DD for consistent sorting
      formattedDate: format(new Date(item.date), 'yyyy-MM-dd')
    }));
  }, [data]);

  console.log(sortedData,"sortedData")

  return (
    <Card className="!shadow-none border-1 border-gray-100 dark:border-border !pt-0">
     <CardHeader className="flex flex-col items-stretch !space-y-0 border-b border-gray-100
      dark:border-border !p-0 pr-1 sm:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-0 sm:py-0">
        <CardTitle className="text-lg">Transaction Overview</CardTitle>
        <CardDescription>
          <span>Showing total transactions {dateRange?.label}</span>
        </CardDescription>
        </div>
        <div className="flex">
          {TRANSACTION_TYPES.map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <div
                key={chart}
                className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-center even:border-l 
                sm:border-l border-gray-100 dark:border-border sm:px-4 sm:py-6 min-w-36"
              >
                <span className="w-full block text-xs text-muted-foreground">
                 No of {chartConfig[chart].label}
                </span>
                <span className="flex items-center justify-center gap-2 text-lg font-semibold leading-none sm:text-3xl">
                  {key === TRANSACTION_TYPES[0] ? <TrendingUpIcon className="size-3 ml-2 text-primary" /> : <TrendingDownIcon className="size-3 ml-2 text-destructive" />}
                  {data.filter(item => key === TRANSACTION_TYPES[0] ? item.income > 0 : item.expenses > 0).length}
                </span>
              </div>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-2 h-[300px]">
        {data?.length === 0 ? (
          <EmptyState
          title="No transaction data"
          description="There are no transactions recorded for this period."
        />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={COLORS[0]}
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor={COLORS[0]}
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={COLORS[1]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={COLORS[1]}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => format(new Date(value), isMobile ? "MMM d" : "MMMM d, yyyy") }
              />
              <ChartTooltip
                cursor={false}
                defaultIndex={isMobile ? -1 : 10}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => format(new Date(value), isMobile ? "MMM d" : "MMMM d")}
                    indicator="dot"
                    
                  />
                }
              />
              <Area
                dataKey="expenses"
                stackId="b"
                type="step"
                fill="url(#expensesGradient)"
                stroke={COLORS[1]}
                className="drop-shadow-sm"
              />
              <Area
                dataKey="income"
                stackId="b"
                type="step"
                fill="url(#incomeGradient)"
                stroke={COLORS[0]}
              />
            <ChartLegend content={<ChartLegendContent  verticalAlign="top"/>} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardDataChart;
