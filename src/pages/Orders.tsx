import { MetricCard } from '@/components/MetricCard';
import { OrdersTable } from '@/components/OrdersTable';
import { mockOrders, mockClinics } from '@/lib/mockData';
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react';

const Orders = () => {
  const totalOrders = mockOrders.length;
  const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
  const processingOrders = mockOrders.filter(o => o.status === 'processing').length;
  const cancelledOrders = mockOrders.filter(o => o.status === 'cancelled').length;

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
            title="Total Orders"
            value={totalOrders}
            icon={Package}
            trend="+12% from last month"
            trendUp
          />
          <MetricCard
            title="Completed"
            value={completedOrders}
            icon={CheckCircle}
            trend="+8% from last month"
            trendUp
          />
          <MetricCard
            title="Processing"
            value={processingOrders}
            icon={Clock}
          />
          <MetricCard
            title="Cancelled"
            value={cancelledOrders}
            icon={XCircle}
          />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-6">All Orders</h2>
          <OrdersTable orders={mockOrders} clinics={mockClinics} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
