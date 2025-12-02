import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface SettlementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalOrders: number;
  totalCredits: number;
  payableAmount: number;
  balance: number;
}

export const SettlementDialog = ({
  open,
  onOpenChange,
  totalOrders,
  totalCredits,
  payableAmount,
  balance,
}: SettlementDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settlement Summary</DialogTitle>
          <DialogDescription>
            Review the settlement details for all clinic orders
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Orders</span>
            <span className="text-lg font-semibold">{totalOrders}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Credits Used</span>
            <span className="text-lg font-semibold text-primary">{totalCredits.toLocaleString()}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Payable Amount</span>
            <span className="text-lg font-semibold text-success">${payableAmount.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="text-lg font-semibold">${balance.toFixed(2)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
