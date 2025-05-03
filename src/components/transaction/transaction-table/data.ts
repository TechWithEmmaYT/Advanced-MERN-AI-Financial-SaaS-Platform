import { addMonths } from "date-fns";
import { TransactionType } from "./column";
import { _TRANSACTION_TYPE, _TRANSACTION_FREQUENCY, _TRANSACTION_STATUS } from "@/constant";

  
export const TRANSACTION_DATA: TransactionType[] = [
    {
      id: "txn_1",
      date: new Date(2023, 5, 15),
      title: "Freelance Payment",
      amount: 1200,
      type: _TRANSACTION_TYPE.INCOME,
      category: "Freelance",
      status: _TRANSACTION_STATUS.COMPLETED,
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 15), 1)
    },
    {
      id: "txn_2",
      date: new Date(2023, 5, 16),
      title: "Grocery Store",
      amount: 85.50,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Food",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 16), 1)
    },
    {
      id: "txn_3",
      date: new Date(2023, 5, 17),
      title: "Electric Bill",
      amount: 75.20,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Utilities",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 17), 1)
    },
    {
      id: "txn_4",
      date: new Date(2023, 5, 18),
      title: "Consulting Work",
      amount: 500,
      type: _TRANSACTION_TYPE.INCOME,
      category: "Services",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 18), 1)
    },
    {
      id: "txn_5",
      date: new Date(2023, 5, 19),
      title: "Coffee Shop",
      amount: 4.75,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Food",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 19), 1)
    },
    {
      id: "txn_6",
      date: new Date(2023, 5, 20),
      title: "Online Course",
      amount: 89.99,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Education",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 20), 1)
    },
    {
      id: "txn_7",
      date: new Date(2023, 5, 21),
      title: "Rent Payment",
      amount: 950,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Housing",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 21), 1)
    },
    {
      id: "txn_8",
      date: new Date(2023, 5, 22),
      title: "Stock Dividends",
      amount: 42.50,
      type: _TRANSACTION_TYPE.INCOME,
      category: "Investments",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 22), 1)
    },
    {
      id: "txn_9",
      date: new Date(2023, 5, 23),
      title: "Gym Membership",
      amount: 35,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Health",
      frequency: _TRANSACTION_FREQUENCY.ONE_TIME
    },
    {
      id: "txn_10",
      date: new Date(2023, 5, 24),
      title: "Book Sale",
      amount: 28.40,
      type: _TRANSACTION_TYPE.INCOME,
      category: "Sales",
      frequency: _TRANSACTION_FREQUENCY.ONE_TIME
    },
    {
      id: "txn_11",
      date: new Date(2023, 5, 25),
      title: "Netflix Subscription",
      amount: 15.99,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Entertainment",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 25), 1)
    },
    {
      id: "txn_12",
      date: new Date(2023, 5, 26),
      title: "Salary Deposit",
      amount: 3000,
      type: _TRANSACTION_TYPE.INCOME,
      category: "Salary",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 26), 1)
    },
    {
      id: "txn_13",
      date: new Date(2023, 5, 27),
      title: "Gym Membership",
      amount: 35,
      type: _TRANSACTION_TYPE.EXPENSE,
      category: "Health",
      frequency: _TRANSACTION_FREQUENCY.MONTHLY,
      nextOccurrence: addMonths(new Date(2023, 5, 27), 1)
    }
  ];