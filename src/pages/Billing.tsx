import { MetricCard } from '@/components/MetricCard';
import { CreditBillingTable } from '@/components/CreditBillingTable';
import { mockCreditUsage } from '@/lib/mockData';
import { CreditCard, DollarSign, Building2, TrendingUp } from 'lucide-react';

const Billing = () => {
  const totalCredits = mockCreditUsage.reduce((sum, usage) => sum + usage.creditsUsed, 0);
  const totalAmount = mockCreditUsage.reduce((sum, usage) => sum + usage.amountBilled, 0);
  const totalClinics = mockCreditUsage.length;
  const avgCreditsPerClinic = Math.round(totalCredits / totalClinics);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Credit Billing Dashboard</h1>
          <p className="text-muted-foreground">
            Centralized billing for CNC team with clinic-wise credit breakdown
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Total Credits Consumed"
            value={totalCredits}
            icon={CreditCard}
            trend="+15% from last month"
            trendUp
          />
          <MetricCard
            title="Total Amount Billed"
            value={`$${totalAmount.toFixed(2)}`}
            icon={DollarSign}
            trend="+18% from last month"
            trendUp
          />
          <MetricCard
            title="Active Clinics"
            value={totalClinics}
            icon={Building2}
          />
          <MetricCard
            title="Avg Credits/Clinic"
            value={avgCreditsPerClinic}
            icon={TrendingUp}
          />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Clinic Credit Breakdown</h2>
            <p className="text-sm text-muted-foreground">
              Detailed credit consumption by clinic for billing CNC team
            </p>
          </div>
          <CreditBillingTable creditUsage={mockCreditUsage} />
        </div>
      </div>
    </div>
  );
};

export default Billing;
