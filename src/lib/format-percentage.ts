export const formatPercentage = (
  value: number,
  { decimalPlaces = 1, addPrefix = false } = {}
): string => {
  if (typeof value !== "number") return "0%";

  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value / 100);

  return addPrefix && value > 0 ? `+${result}` : result;
};
