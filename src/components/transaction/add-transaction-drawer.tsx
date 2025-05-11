import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import TransactionForm from "./transaction-form";

const AddTransactionDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="!cursor-pointer !text-white">
          <PlusIcon className="h-4 w-4" />
          Add Transaction
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Add Transaction
          </DrawerTitle>
          <DrawerDescription>
            Add a new transaction to track your finances
          </DrawerDescription>
        </DrawerHeader>
        <TransactionForm />
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionDrawer;
