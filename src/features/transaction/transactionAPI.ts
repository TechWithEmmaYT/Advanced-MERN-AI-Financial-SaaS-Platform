import { apiClient } from "@/app/api-client";
import { AIScanReceiptResponse, BulkImportTransactionPayload, CreateTransactionBody, GetAllTransactionParams, GetAllTransactionResponse, GetSingleTransactionResponse, UpdateTransactionPayload } from "./transationType";

export const transactionApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation<void, CreateTransactionBody>({
      query: (body) => ({
        url: "/transaction/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["transactions","analytics"],
    }),

    aiScanReceipt: builder.mutation<AIScanReceiptResponse, FormData>({
      query: (formData) => ({
        url: "/transaction/scan-receipt",
        method: "POST",
        body: formData,
      }),
    }),

    getAllTransactions: builder.query<GetAllTransactionResponse, GetAllTransactionParams>({
      query: (params) =>{
        const {keyword = undefined, type = undefined, recurringStatus = undefined, pageNumber = 1, pageSize = 10} = params;
        
        return  ({
          url: "/transaction/all",
          method: "GET",
          params:{
            keyword ,
            type,
            recurringStatus,
            pageNumber,
            pageSize,
          },
        })
      },
      providesTags: ["transactions"],
    }),

    getSingleTransaction: builder.query<GetSingleTransactionResponse, string>({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "GET",
      }),
    }),

    duplicateTransaction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/transaction/duplicate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["transactions"],
    }),

    updateTransaction: builder.mutation<void, UpdateTransactionPayload>({
      query: ({ id, transaction }) => ({
        url: `/transaction/update/${id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: ["transactions"],
    }),

    bulkImportTransaction: builder.mutation<void, BulkImportTransactionPayload>(
      {
        query: (body) => ({
          url: "/transaction/bulk-transaction",
          method: "POST",
          body,
        }),
        invalidatesTags: ["transactions"],
      }
    ),

    deleteTransaction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/transaction/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions","analytics"],
    }),

    bulkDeleteTransaction: builder.mutation<void, string[]>({
      query: (transactionIds) => ({
        url: "/transaction/bulk-delete",
        method: "DELETE",
        body: {
          transactionIds,
        },
      }),
      invalidatesTags: ["transactions","analytics"],
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetAllTransactionsQuery,
  useAiScanReceiptMutation,
  useGetSingleTransactionQuery,
  useDuplicateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useBulkDeleteTransactionMutation,
} = transactionApi;
