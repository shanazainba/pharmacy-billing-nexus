import { NavLink } from '@/components/NavLink';
import { Package, CreditCard } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-foreground">
              Clinic Management
            </h1>
            <div className="flex gap-1">
              <NavLink
                to="/"
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeClassName="bg-muted text-foreground"
              >
                <Package className="h-4 w-4" />
                Orders
              </NavLink>
              <NavLink
                to="/billing"
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeClassName="bg-muted text-foreground"
              >
                <CreditCard className="h-4 w-4" />
                Communications
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
