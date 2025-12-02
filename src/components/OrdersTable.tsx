import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { ClinicOrderSummary, OrderStatus } from '@/types';
import { SettlementDialog } from './SettlementDialog';
import { mockOrders } from '@/lib/mockData';

interface OrdersTableProps {
  clinicSummaries: ClinicOrderSummary[];
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  processing: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const OrdersTable = ({ clinicSummaries }: OrdersTableProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [settlementOpen, setSettlementOpen] = useState(false);

  const filteredSummaries = clinicSummaries.filter(summary => {
    const matchesSearch = summary.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         summary.fulfillmentPharmacy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || summary.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCredits = mockOrders.reduce((sum, order) => sum + order.credits, 0);
  const totalOrders = mockOrders.length;
  const totalAmount = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const balance = totalAmount * 0.1; // Example: 10% of total as balance

  const handleRowClick = (clinicId: string) => {
    navigate(`/orders/${clinicId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clinics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Clinic Name</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Fulfillment Pharmacy</TableHead>
              <TableHead className="font-semibold text-right">Total Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSummaries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground h-32">
                  No clinics found
                </TableCell>
              </TableRow>
            ) : (
              filteredSummaries.map((summary) => (
                <TableRow 
                  key={summary.clinicId} 
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(summary.clinicId)}
                >
                  <TableCell className="font-medium">{summary.clinicName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(summary.lastOrderDate, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{summary.fulfillmentPharmacy}</TableCell>
                  <TableCell className="text-right font-medium text-primary">
                    {summary.totalOrders}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-muted/50">
              <TableCell colSpan={3} className="font-semibold">Total Credits Used</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-4">
                  <span className="font-semibold text-primary text-lg">
                    {totalCredits.toLocaleString()}
                  </span>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSettlementOpen(true);
                    }}
                    size="sm"
                  >
                    Settle
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <SettlementDialog
        open={settlementOpen}
        onOpenChange={setSettlementOpen}
        totalOrders={totalOrders}
        totalCredits={totalCredits}
        payableAmount={totalAmount}
        balance={balance}
      />
    </div>
  );
};
