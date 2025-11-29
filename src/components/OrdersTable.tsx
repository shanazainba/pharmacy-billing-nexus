import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
import { Download, FileSpreadsheet, FileText, Search } from 'lucide-react';
import { Order, OrderStatus } from '@/types';
import { exportOrdersToExcel, exportOrdersToPDF } from '@/lib/exportUtils';

interface OrdersTableProps {
  orders: Order[];
  clinics: { id: string; name: string }[];
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  processing: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const OrdersTable = ({ orders, clinics }: OrdersTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.clinicName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClinic = selectedClinic === 'all' || order.clinicId === selectedClinic;
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesClinic && matchesStatus;
  });

  const handleExportExcel = () => {
    exportOrdersToExcel(filteredOrders);
  };

  const handleExportPDF = () => {
    exportOrdersToPDF(filteredOrders);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedClinic} onValueChange={setSelectedClinic}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by clinic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clinics</SelectItem>
              {clinics.map(clinic => (
                <SelectItem key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      </div>

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
              <TableHead className="font-semibold">Order Number</TableHead>
              <TableHead className="font-semibold">Clinic Name</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Items</TableHead>
              <TableHead className="font-semibold text-right">Amount</TableHead>
              <TableHead className="font-semibold text-right">Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground h-32">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.clinicName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(order.date, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.itemsCount}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-primary">
                    {order.credits}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
