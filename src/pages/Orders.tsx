import { MetricCard } from '@/components/MetricCard';
import { OrdersTable } from '@/components/OrdersTable';
import { Button } from '@/components/ui/button';
import { mockOrders, getClinicOrderSummaries } from '@/lib/mockData';
import { Package, Calendar, CheckCircle, Clock, FileSpreadsheet, FileText } from 'lucide-react';
import { exportClinicSummariesToExcel, exportClinicSummariesToPDF } from '@/lib/exportUtils';

const Orders = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const totalOrdersToday = mockOrders.filter(o => {
    const orderDate = new Date(o.date);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  }).length;
  
  const totalOrdersThisMonth = mockOrders.filter(o => 
    o.date >= startOfMonth
  ).length;
  
  const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  
  const clinicSummaries = getClinicOrderSummaries();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
          <p className="text-muted-foreground">
            Track and manage clinic orders across all locations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Total Orders Today"
            value={totalOrdersToday}
            icon={Package}
            trend={`${totalOrdersToday} orders today`}
            trendUp
          />
          <MetricCard
            title="Total Orders This Month"
            value={totalOrdersThisMonth}
            icon={Calendar}
            trend="+12% from last month"
            trendUp
          />
          <MetricCard
            title="Completed Orders"
            value={completedOrders}
            icon={CheckCircle}
            trend="+8% from last month"
            trendUp
          />
          <MetricCard
            title="Pending Orders"
            value={pendingOrders}
            icon={Clock}
          />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Clinic Orders</h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => exportClinicSummariesToExcel(clinicSummaries)} 
                variant="outline" 
                size="sm"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
              <Button 
                onClick={() => exportClinicSummariesToPDF(clinicSummaries)} 
                variant="outline" 
                size="sm"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
          <OrdersTable clinicSummaries={clinicSummaries} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
