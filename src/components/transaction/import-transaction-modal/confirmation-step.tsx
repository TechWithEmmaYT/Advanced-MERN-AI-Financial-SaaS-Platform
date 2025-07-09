import { useState } from "react";
import { z } from "zod";
import { ChevronDown, ChevronLeft, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { _TRANSACTION_TYPE, PAYMENT_METHODS_ENUM } from "@/constant";
import { toast } from "sonner";
import { MAX_IMPORT_LIMIT } from "@/constant";
import { BulkTransactionType } from "@/features/transaction/transationType";
import { useProgressLoader } from "@/hooks/use-progress-loader";

type ConfirmationStepProps = {
  file: File | null;
  mappings: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  csvData: any[];
  onComplete: () => void;
  onBack: () => void;
};

const transactionSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  amount: z
    .number({
      invalid_type_error: "Amount must be a number",
      required_error: "Amount is required",
    })
    .positive("Amount must be greater than zero"),
  date: z.preprocess(
    (val) => new Date(val as string),
    z.date({
      invalid_type_error: "Invalid date format",
      required_error: "Date is required",
    })
  ),
  type: z.enum([_TRANSACTION_TYPE.INCOME, _TRANSACTION_TYPE.EXPENSE], {
    invalid_type_error: "Invalid transaction type",
    required_error: "Transaction type is required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  paymentMethod: z
    .union([
      z.literal(""),
      z.undefined(),
      z.enum(
        [
          PAYMENT_METHODS_ENUM.CARD,
          PAYMENT_METHODS_ENUM.BANK_TRANSFER,
          PAYMENT_METHODS_ENUM.MOBILE_PAYMENT,
          PAYMENT_METHODS_ENUM.AUTO_DEBIT,
          PAYMENT_METHODS_ENUM.CASH,
          PAYMENT_METHODS_ENUM.OTHER,
        ],
        {
          errorMap: (issue) => ({
            message:
              issue.code === "invalid_enum_value"
                ? `Payment method must be one of: ${Object.values(PAYMENT_METHODS_ENUM).join(", ")}`
                : "Invalid payment method",
          }),
        }
      ),
    ])
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

const ConfirmationStep = ({
  file,
  mappings,
  csvData,
  onComplete,
  onBack,
}: ConfirmationStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    progress,
    isLoading,
    startProgress,
    updateProgress,
    doneProgress,
    resetProgress,
  } = useProgressLoader({ initialProgress: 10, completionDelay: 500 });

  // const [bulkImportTransaction] = useBulkImportTransactionMutation();

  const handleImport = () => {
    const { transactions, hasValidationErrors } =
      getAssignFieldToMappedTransactions();
    console.log(transactions, "transactions");

    if (hasErrors || hasValidationErrors) return;

    if (transactions.length > MAX_IMPORT_LIMIT) {
      toast.error(`Cannot import more than ${MAX_IMPORT_LIMIT} transactions`);
      return;
    }
    resetProgress();
    startProgress(10);
    // Start progress
    let currentProgress = 10;
    const interval = setInterval(() => {
      const increment = currentProgress < 90 ? 10 : 1;
      currentProgress = Math.min(currentProgress + increment, 90);
      updateProgress(currentProgress);
    }, 250);

    const payload = { transactions: transactions as BulkTransactionType[] };

    console.log(payload, "payload");

    setTimeout(() => {
      clearInterval(interval);
      doneProgress(); // Sets progress to 100%
      resetProgress(); // Optional reset for reuse
      onComplete();
    }, 2000);

    // bulkImportTransaction(payload)
    //   .unwrap()
    //   .then(() => {
    //     updateProgress(100);
    //     toast.success("Imported transactions successfully");
    //   })
    //   .catch((error) => {
    //     resetProgress();
    //     toast.error(error.data?.message || "Failed to import transactions");
    //   })
    //   .finally(() => {
    //     clearInterval(interval);
    //     setTimeout(() => {
    //       resetProgress();
    //       onComplete();
    //     }, 500);
    //   });
  };

  const getAssignFieldToMappedTransactions = () => {
    let hasValidationErrors = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results: Partial<any>[] = [];
    csvData.forEach((row, index) => {
      const transaction: Record<string, string> = {};
      // Apply mappings
      Object.entries(mappings).forEach(([csvColumn, transactionField]) => {
        if (transactionField === "Skip" || row[csvColumn] === undefined) return;
        transaction[transactionField] =
          transactionField === "amount"
            ? Number(row[csvColumn])
            : transactionField === "date"
              ? new Date(row[csvColumn])
              : row[csvColumn];
      });
      console.log(transaction, "transaction");
      try {
        const validated = transactionSchema.parse(transaction);
        results.push(validated);
      } catch (error) {
        hasValidationErrors = true;
        const message =
          error instanceof z.ZodError
            ? error.errors
                .map((e) => {
                  if (e.path[0] === "type")
                    return "Transaction type:- must be INCOME or EXPENSE";
                  if (e.path[0] === "paymentMethod")
                    return (
                      "Payment method:- must be one of: " +
                      Object.values(PAYMENT_METHODS_ENUM).join(", ")
                    );
                  return `${e.path[0]}: ${e.message}`;
                })
                .join("\n")
            : "Invalid data";
        setErrors((prev) => ({
          ...prev,
          [index + 1]: message,
        }));
      }
    });
    return { transactions: results, hasValidationErrors };
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-1">
          Confirm Import
        </DialogTitle>
        <DialogDescription>
          Review your settings before importing
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="border rounded-md p-4 w-full">
          <h4 className="flex items-center gap-1 font-medium mb-2">
            <FileCheck className="w-4 h-4" />
            Import Summary
          </h4>
          <div className="grid grid-cols-2 w-full gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">File</p>
              <p>{file?.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Columns Mapped</p>
              <p>{Object.keys(mappings).length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Transactions</p>
              <p>{csvData.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Transactions Limit </p>
              <p>{MAX_IMPORT_LIMIT}</p>
            </div>
          </div>
        </div>

        {hasErrors && (
          <div
            className="w-full block border border-red-100 bg-[#fef2f2] dark:bg-background
            rounded text-sm max-h-60 overflow-y-auto"
            style={{
              maxHeight: "250px",
            }}
          >
            <p className="font-medium mb-2 bg-[#fef2f2] dark:bg-background sticky top-0 px-2 py-1">
              Issues found:
            </p>
            <div className="space-y-1 p-2">
              {Object.entries(errors).map(([row, msg]) => (
                <details key={row} className="group">
                  <summary className="flex text-sm items-center justify-between cursor-pointer !text-red-600">
                    <span>Row {row}</span>
                    <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-1 pl-2 text-xs !text-red-500 border-l-2 border-red-200">
                    {msg.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Importing... {progress}%
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleImport} disabled={isLoading}>
          {isLoading ? "Importing..." : "Confirm Import"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
