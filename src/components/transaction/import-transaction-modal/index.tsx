import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImportIcon } from "lucide-react";

const ImportTransactionModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="!shadow-none !cursor-pointer !border-gray-500 !text-white !bg-transparent"
        >
          <ImportIcon className="!w-5 !h-5" />
          Bulk Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl min-h-[25vh]">
        <DialogHeader>
          <DialogTitle>Bulk Import Transactions</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import transactions.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-0">
          <h1 className="text-lg font-medium mb-2">Support Us</h1>
          <p className="text-base mb-2">
            The bulk import feature is part of the{" "}
            <strong>extended version</strong> of this project. It took us{" "}
            <strong>weeks and months</strong> to design, build, and refine.
            <br />By supporting us, you unlock features like{" "}
            <strong>CSV import</strong>,
            {"---"}<strong className="ml-4"> Free trial & Pro payments (Stripe)</strong>, and full{" "}
            <strong>source code</strong>.
          </p>
          <p className="text-base mb-2">
            Your support helps us keep creating{" "}
            <strong>free, advanced projects</strong> for the community.
          </p>
          <p className="text-base">
            🛠️ Get access here:{" "}
            <a
              className="text-blue-500 underline"
              href="https://techwithemma.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
             https://bitly.com/techwithemma
            </a>
          </p>
          <br />
          <br />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportTransactionModal;
