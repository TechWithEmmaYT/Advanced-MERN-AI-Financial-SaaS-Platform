import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TransactionForm from "./transaction-form";

const EditTransactionDrawer = () => {
  return (
    <Drawer direction="right">
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Edit Transaction
          </DrawerTitle>
          <DrawerDescription>
            Edit a transaction to track your finances
          </DrawerDescription>
        </DrawerHeader>
        <TransactionForm isEdit transactionId={"string"}/>
      </DrawerContent>
    </Drawer>
  );
};

export default EditTransactionDrawer;
