export const formatCurrency = (value: number,
  options: { 
    currency?: string; 
    decimalPlaces?: number;
    compact?: boolean;
    showSign?: boolean;
    isExpense?: boolean;
  } = {}
):string => {
  const { currency = 'USD', decimalPlaces = 2, compact = false, showSign = false, isExpense = false } = options;

  const displayValue = isExpense ? -Math.abs(value) : value;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    notation: compact ? 'compact' : 'standard',
    //signDisplay: showSign  ? 'always' : isExpense ? 'always' : 'auto',
    signDisplay: showSign ? 'always' : 'auto',
  }).format(displayValue);
};
