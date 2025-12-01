import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { CreditUsage } from '@/types';
import { exportCreditUsageToExcel, exportCreditUsageToPDF } from '@/lib/exportUtils';

interface CreditBillingTableProps {
  creditUsage: CreditUsage[];
}

export const CreditBillingTable = ({ creditUsage }: CreditBillingTableProps) => {
  const totalWhatsapp = creditUsage.reduce((sum, usage) => sum + usage.whatsappMessages, 0);
  const totalEmail = creditUsage.reduce((sum, usage) => sum + usage.emailMessages, 0);
  const totalRevenue = creditUsage.reduce((sum, usage) => sum + usage.whatsappRevenue + usage.emailRevenue, 0);

  const handleExportExcel = () => {
    exportCreditUsageToExcel(creditUsage);
  };

  const handleExportPDF = () => {
    exportCreditUsageToPDF(creditUsage);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={handleExportExcel} variant="outline" size="sm">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export Excel
        </Button>
        <Button onClick={handleExportPDF} variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Clinic Name</TableHead>
              <TableHead className="font-semibold text-right">WhatsApp Messages</TableHead>
              <TableHead className="font-semibold text-right">Email Messages</TableHead>
              <TableHead className="font-semibold text-right">Revenue Generated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditUsage.map((usage) => (
              <TableRow key={usage.clinicId} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{usage.clinicName}</TableCell>
                <TableCell className="text-right font-medium text-primary">
                  {usage.whatsappMessages.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-medium text-primary">
                  {usage.emailMessages.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${(usage.whatsappRevenue + usage.emailRevenue).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-muted/50 font-semibold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right text-primary">{totalWhatsapp.toLocaleString()}</TableCell>
              <TableCell className="text-right text-primary">{totalEmail.toLocaleString()}</TableCell>
              <TableCell className="text-right">${totalRevenue.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
