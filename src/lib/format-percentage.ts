export const formatPercentage = (
  value: number,
  options: {
    decimalPlaces?: number;
    showSign?: boolean;
    isExpense?: boolean;
  } = {}
): string => {
  const { decimalPlaces = 1, showSign = false, isExpense = false } = options;
  
  if (typeof value !== "number" || isNaN(value)) return "0%";
    
  const absValue = Math.abs(value);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(absValue / 100);

  
  if (!showSign) return formatted;
   // Special handling for expenses (opposite of normal)
   if (isExpense) {
    return value <= 0 ? `+${formatted}` : `-${formatted}`;
  }

  // Normal handling for income/balance
  return value >= 0 ? `+${formatted}` : `-${formatted}`;

};
