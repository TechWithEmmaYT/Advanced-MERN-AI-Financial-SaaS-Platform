  export const CATEGORIES = [
    { value: "groceries", label: "Groceries" },
    { value: "dining", label: "Dining & Restaurants" },
    { value: "transportation", label: "Transportation" },
    { value: "utilities", label: "Utilities" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "healthcare", label: "Healthcare" },
    { value: "travel", label: "Travel" },
    { value: "housing", label: "Housing & Rent" },
    { value: "income", label: "Income" },
    { value: "investments", label: "Investments" },
    { value: "other", label: "Other" },
  ];

  export const PAYMENT_METHODS = [
    { value: "card", label: "Credit/Debit Card" },
    { value: "cash", label: "Cash" },
    { value: "transfer", label: "Bank Transfer" },
    { value: "mobile", label: "Mobile Payment" },
    { value: "other", label: "Other" },
  ];


export const _TRANSACTION_FREQUENCY = {
  ONE_TIME: "ONE_TIME",
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY"
} as const

export type TransactionFrequencyType = keyof typeof _TRANSACTION_FREQUENCY

export const _TRANSACTION_TYPE = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
} as const

export type _TransactionType = keyof typeof _TRANSACTION_TYPE

export const _TRANSACTION_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED"
} as const

export type TransactionStatusType = keyof typeof _TRANSACTION_STATUS

export const _REPORT_STATUS = {
  SENT: "SENT",
  FAILED: "FAILED",
  PENDING: "PENDING",
  PROCESSING: "PROCESSING"
} as const

export type ReportStatusType = keyof typeof _REPORT_STATUS

