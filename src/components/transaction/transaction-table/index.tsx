import { DataTable } from "@/components/data-table";
import { TRANSACTION_DATA } from "./data";
import { transactionColumns } from "./column";
import { _TRANSACTION_TYPE } from "@/constant";

const TransactionTable = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  const handleFilterChange = () => {};
  const handleBulkDelete = (ids: string[]) => {
    console.log(ids);
  };

  return (
    <DataTable
      data={TRANSACTION_DATA}
      columns={transactionColumns}
      searchPlaceholder="Search transactions..."
      filters={[
        {
          key: "type",
          label: "All Types",
          options: [
            { value: _TRANSACTION_TYPE.INCOME, label: "Income" },
            { value: _TRANSACTION_TYPE.EXPENSE, label: "Expense" },
          ],
        },
        {
          key: "schedule",
          label: "Schedule",
          options: [
            { value: "RECURRING", label: "Recurring" },
            { value: "NON_RECURRING", label: "Non-Recurring" },
          ],
        },
      ]}
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      onBulkDelete={handleBulkDelete}
    />
  );
};
export default TransactionTable;
