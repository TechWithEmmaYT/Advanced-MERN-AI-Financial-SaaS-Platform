import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";

const useEditTransactionDrawer = () => {
  const [open, setOpen] = useQueryState(
    "edit",
    parseAsBoolean.withDefault(false)
  );
  const [transactionId, setTransactionId] = useQueryState(
    "transactionId",
    parseAsString.withDefault("")
  );
  const onOpenDrawer = (transactionId: string) => {
    setTransactionId(transactionId);
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setTransactionId("");
    setOpen(false);
  };

  return {
    open,
    transactionId,
    onOpenDrawer,
    onCloseDrawer,
  };
};

export default useEditTransactionDrawer;