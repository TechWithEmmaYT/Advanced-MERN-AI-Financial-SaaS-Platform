import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadIcon } from "lucide-react";

const RecieptScanner = () => {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setReceiptUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Scan Receipt</Label>
      <div className="flex items-start gap-3 border-b pb-4">
        <div
          className={`h-12 w-12 rounded-md border bg-cover bg-center ${
            !receiptUrl ? "bg-muted" : ""
          }`}
          style={receiptUrl ? { backgroundImage: `url(${receiptUrl})` } : {}}
        >
          {!receiptUrl && (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <UploadIcon color="currentColor" className="h-4 w-4" />
            </div>
          )}
        </div>
        {/* Upload Input */}
        <div className="flex-1">
          <Input
            type="file"
            accept="image/*"
            onChange={handleReceiptUpload}
            className="max-w-[250px] cursor-pointer text-sm file:mr-2 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
          />
          <p className="mt-2 text-[11px] px-2 text-muted-foreground">
            JPG, PNG up to 5MB
          </p>
        </div>
      </div>

      {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
        Scanning receipt...
      </div> */}
    </div>
  );
};

export default RecieptScanner;
