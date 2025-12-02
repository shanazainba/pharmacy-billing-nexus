import { MetricCard } from '@/components/MetricCard';
import { CreditBillingTable } from '@/components/CreditBillingTable';
import { mockCreditUsage } from '@/lib/mockData';
import { MessageCircle, Mail, DollarSign, TrendingUp } from 'lucide-react';

const Billing = () => {
  const totalWhatsappMessages = mockCreditUsage.reduce((sum, usage) => sum + usage.whatsappMessages, 0);
  const totalEmailMessages = mockCreditUsage.reduce((sum, usage) => sum + usage.emailMessages, 0);
  const whatsappRevenue = mockCreditUsage.reduce((sum, usage) => sum + usage.whatsappRevenue, 0);
  const emailRevenue = mockCreditUsage.reduce((sum, usage) => sum + usage.emailRevenue, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Communications</h1>
          <p className="text-muted-foreground">
            Centralized communications tracking for CNC team with clinic-wise message breakdown
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Total WhatsApp Messages"
            value={totalWhatsappMessages.toLocaleString()}
            icon={MessageCircle}
            trend="+15% from last month"
            trendUp
          />
          <MetricCard
            title="Total Email Messages"
            value={totalEmailMessages.toLocaleString()}
            icon={Mail}
            trend="+18% from last month"
            trendUp
          />
          <MetricCard
            title="WhatsApp Revenue Generated"
            value={`$${whatsappRevenue.toFixed(2)}`}
            icon={DollarSign}
            trend="+12% from last month"
            trendUp
          />
          <MetricCard
            title="Email Revenue Generated"
            value={`$${emailRevenue.toFixed(2)}`}
            icon={TrendingUp}
            trend="+10% from last month"
            trendUp
          />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Clinic Message Breakdown</h2>
            <p className="text-sm text-muted-foreground">
              Detailed message usage by clinic for billing CNC team
            </p>
          </div>
          <CreditBillingTable creditUsage={mockCreditUsage} />
        </div>
      </div>
    </div>
  );
};

export default Billing;
