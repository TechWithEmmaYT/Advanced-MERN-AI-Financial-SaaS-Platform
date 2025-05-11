import { FC } from "react";
import CountUp from "react-countup";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { formatPercentage } from "@/lib/format-percentage";

interface PropsType {
  title: string;
  value?: number;
  dateRange: string;
  percentageChange?: number;
  isPercentageValue?: boolean;
}

const getSavingsStatus = (rate: number) => {
  if (rate < 5) return { label: "Critical", color: "text-red-400", Icon: TrendingDownIcon };
  if (rate < 10) return { label: "Low", color: "text-yellow-400", Icon: TrendingDownIcon };
  if (rate < 20) return { label: "Healthy", color: "text-green-400", Icon: TrendingUpIcon };
  return { label: "Excellent", color: "text-teal-400", Icon: TrendingUpIcon };
};

const SummaryCard: FC<PropsType> = ({
  title,
  value,
  dateRange,
  percentageChange,
  isPercentageValue,
}) => {
  const isSavings = title.toLowerCase().includes("savings");
  const savingsStatus = isSavings ? getSavingsStatus(value || 0) : null;

  return (
    <Card className=" !border-none !border-0 !gap-0 !bg-white/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 !pb-5">
        <CardTitle className="text-[15px] text-gray-300 font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="text-4xl font-bold text-white">
          <CountUp
            start={0}
            end={value || 0}
            preserveValue
            decimals={2}
            decimalPlaces={2}
            formattingFn={isPercentageValue ? formatPercentage : formatCurrency}
          />
        </div>

        <p className="flex items-center whitespace-nowrap gap-1 text-sm text-muted-foreground">
          {isSavings && savingsStatus ? (
            <>
              <savingsStatus.Icon className={`size-3 ${savingsStatus.color}`} />
              <span className={savingsStatus.color}>
                {savingsStatus.label} ({value}%)
              </span>
              {value && value < 10 ? <span className="whitespace-nowrap text-gray-400 ml-1">vs recommended 10%</span>: null}
            </>
          ) : (
            <>
              <span
                className={
                  percentageChange && percentageChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {formatPercentage(percentageChange || 0, { addPrefix: true })}
              </span>
              {percentageChange && percentageChange >= 0 ? (
                <TrendingUpIcon className="size-3 text-green-500" />
              ) : (
                <TrendingDownIcon className="size-3 text-red-500" />
              )}
              <span>{dateRange}</span>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;


  /* <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <span
            className={
              percentageChange && percentageChange >= 0
                ? "!text-green-500"
                : "!text-red-500"
            }
          >
            {formatPercentage(percentageChange || 0, { addPrefix: true })}
          </span>
          {percentageChange && percentageChange >= 0 ? (
            <TrendingUpIcon className="size-3 ml-px text-green-500" />
          ) : (
            <TrendingDownIcon className="size-3 ml-px text-red-500" />
          )}
         <span>from {dateRange}</span>
        </p> */

