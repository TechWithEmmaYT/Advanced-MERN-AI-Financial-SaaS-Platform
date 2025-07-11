
export interface FilterParams {
    preset?: string;
    from?: string;
    to?: string;
}

interface PercentageChange {
    income: number;
    expenses: number;
    balance: number;
    prevPeriodFrom: string | null;
    prevPeriodTo: string | null;
}

interface PresetType {
    from: string;
    to: string;
    value: string;
    label: string;
}

export interface SummaryAnalyticsResponse {
    message: string;
    data: {
        availableBalance: number;
        totalIncome: number;
        totalExpenses: number;
        transactionCount: number;
        savingRate: {
            percentage: number;
            expenseRatio: number;
          };
        percentageChange: PercentageChange;
        preset: PresetType;
    }
}

export interface ChartAnalyticsResponse {
    message: string;
    data: {
        chartData: {
            date: string;
            income: number;
            expenses: number;
        }[];
        totalIncomeCount: number;
        totalExpenseCount: number;
        preset: PresetType;
    }
}


export interface ExpensePieChartBreakdownResponse {
    message: string;
    data: {
        totalSpent: number;
        breakdown: {
            name: string;
            value: number;
            percentage: number;
        }[];
        preset: PresetType;
    }
}