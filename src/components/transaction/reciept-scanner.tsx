import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScanText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReceiptScannerProps {
  onScanComplete: (data: {
    amount?: number;
    date?: Date;
    merchant?: string;
    items?: Array<{ name: string; price: number }>;
  }) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

const ReceiptScanner = ({ onScanComplete, onLoadingChange }: ReceiptScannerProps) => {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleReceiptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    onLoadingChange(true);
    setProgress(0);
    // Simulate file upload and processing
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setReceiptUrl(result);
      
      // Simulate scanning progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            simulateScanComplete();
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    };
    reader.readAsDataURL(file);
  };

  const simulateScanComplete = () => {
    setTimeout(() => {
      const mockData = {
        amount: 42.99,
        date: new Date(),
        merchant: "Example Store",
        items: [
          { name: "Product 1", price: 19.99 },
          { name: "Product 2", price: 23.00 }
        ]
      };
      onScanComplete(mockData);
      setIsLoading(false);
      onLoadingChange(false);
    }, 500);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">AI Scan Receipt</Label>
      <div className="flex items-start gap-3 border-b pb-4">
        {/* Receipt Preview */}
        <div
          className={`h-12 w-12 rounded-md border bg-cover bg-center ${
            !receiptUrl ? "bg-muted" : ""
          }`}
          style={receiptUrl ? { backgroundImage: `url(${receiptUrl})` } : {}}
        >
          {!receiptUrl && (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <ScanText color="currentColor" className="h-5 w-5 !stroke-1.5" />
            </div>
          )}
        </div>

        {/* Upload Input or Progress */}
        <div className="flex-1">
          {!isLoading ? (
            <>
              <Input
                type="file"
                accept="image/*"
                onChange={handleReceiptUpload}
                className="max-w-[250px] px-1 h-9 cursor-pointer text-sm file:mr-2 
            file:rounded file:border-0 file:bg-primary file:px-3 file:py-px
             file:text-sm file:font-medium file:text-white 
             hover:file:bg-primary/90" 
                disabled={isLoading}
              />
              <p className="mt-2 text-[11px] px-2 text-muted-foreground">
                JPG, PNG up to 5MB
              </p>
            </>
          ) : (
            <div className="space-y-2 pt-3">
              <Progress value={progress} className="h-2 w-[250px]" />
              <p className="text-xs text-muted-foreground">
                Scanning receipt... {progress}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptScanner;