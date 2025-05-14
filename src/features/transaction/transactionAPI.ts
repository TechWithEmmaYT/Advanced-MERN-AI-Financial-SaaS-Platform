
import { apiClient } from "@/app/api-client";

export const transactionApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    
    createTransaction: builder.mutation({
      query: (credentials) => ({
        url: '/transaction/create',
        method: 'POST',
        body: credentials
      }),
    }),

    scanReceipt: builder.mutation({
      query: (formData) => ({
        url: '/transaction/scan-receipt',
        method: 'POST',
        body: formData
      }),
    }),

    getAllTransactions: builder.query({
      query: () => ({
        url: '/transaction/all',
        method: 'GET',
      }),
    }),
    
    getSingleTransaction: builder.query({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: 'GET',
      }),
    }),
    duplicateTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/duplicate/${id}`,
        method: 'PUT',
      }),
    }),
    updateTransaction: builder.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: ({id, transaction}: {id: string, transaction: any}) => ({
        url: `/transaction/${id}`,
        method: 'PUT',
        body: transaction
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: 'DELETE',
      }),
    }),
    bulkDeleteTransaction: builder.mutation({
      query: (ids) => ({
        url: '/transaction/bulk-delete',
        method: 'DELETE',
        body: ids
      }),
    }),
  })
});

export const { 
    useCreateTransactionMutation,
    useScanReceiptMutation,
    useGetAllTransactionsQuery,
    useGetSingleTransactionQuery,
    useDuplicateTransactionMutation,
    useDeleteTransactionMutation,
    useBulkDeleteTransactionMutation,
 } = transactionApi;