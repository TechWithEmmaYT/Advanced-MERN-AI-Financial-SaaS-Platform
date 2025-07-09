import { DataTable } from "@/components/data-table";
import { TRANSACTION_DATA } from "./data";
import { transactionColumns } from "./column";
import { _TRANSACTION_TYPE, _TransactionType } from "@/constant";
import { useState } from "react";
import useDebouncedSearch from "@/hooks/use-debounce-search";

type FilterType = {
  type?: _TransactionType | undefined;
  recurringStatus?: "RECURRING" | "NON_RECURRING" | undefined;
  pageNumber?: number;
  pageSize?: number;
};

const TransactionTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
}) => {
  const [filter, setFilter] = useState<FilterType>({
    type: undefined,
    recurringStatus: undefined,
    pageNumber: 1,
    pageSize: props.pageSize || 10,
  });

  const { debouncedTerm, setSearchTerm } = useDebouncedSearch("", {
    delay: 500,
  });

  // const [bulkDeleteTransaction, { isLoading: isBulkDeleting }] =
  //   useBulkDeleteTransactionMutation();

  // const { data, isFetching } = useGetAllTransactionsQuery({
  //   keyword: debouncedTerm,
  //   type: filter.type,
  //   recurringStatus: filter.recurringStatus,
  //   pageNumber: filter.pageNumber,
  //   pageSize: filter.pageSize,
  // });

  // const transactions = data?.transactions || [];
  // const pagination = {
  //   totalItems: data?.pagination?.totalCount || 0,
  //   totalPages: data?.pagination?.totalPages || 0,
  //   pageNumber: filter.pageNumber,
  //   pageSize: filter.pageSize,
  // };


  const pagination = {
    totalItems: 20,
    totalPages: 1,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  };


  const handleSearch = (value: string) => {
    console.log(debouncedTerm);
    setSearchTerm(value);
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    const { type, frequently } = filters;
    setFilter((prev) => ({
      ...prev,
      type: type as _TransactionType,
      recurringStatus: frequently as "RECURRING" | "NON_RECURRING",
    }));
  };


  const handlePageChange = (pageNumber: number) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  const handleBulkDelete = (transactionIds: string[]) => {
    console.log(transactionIds);

    // bulkDeleteTransaction(transactionIds)
    // .unwrap()
    // .then(() => {
    //   toast.success("Transactions deleted successfully");
    // })
    // .catch((error) => {
    //   toast.error(error.data?.message || "Failed to delete transactions");
    // });
  };

  return (
    <DataTable
      data={TRANSACTION_DATA} //transactions
      columns={transactionColumns}
      searchPlaceholder="Search transactions..."
      isLoading={false}
      isBulkDeleting={false}
      isShowPagination={props.isShowPagination}
      pagination={pagination}
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
          key: "frequently",
          label: "Frequently",
          options: [
            { value: "RECURRING", label: "Recurring" },
            { value: "NON_RECURRING", label: "Non-Recurring" },
          ],
        },
      ]}
      onSearch={handleSearch}
      onPageChange={(pageNumber) => handlePageChange(pageNumber)}
      onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
      onFilterChange={(filters) => handleFilterChange(filters)}
      onBulkDelete={handleBulkDelete}
    />
  );
};
export default TransactionTable;
