export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  clinicId: string;
  clinicName: string;
  date: Date;
  status: OrderStatus;
  itemsCount: number;
  totalAmount: number;
  credits: number;
  fulfillmentPharmacy: string;
}

export interface ClinicOrderSummary {
  clinicId: string;
  clinicName: string;
  lastOrderDate: Date;
  fulfillmentPharmacy: string;
  status: OrderStatus;
  totalOrders: number;
}

export interface Clinic {
  id: string;
  name: string;
  location: string;
  contactPerson: string;
  contactEmail: string;
}

export interface CreditUsage {
  clinicId: string;
  clinicName: string;
  whatsappMessages: number;
  emailMessages: number;
  whatsappRevenue: number;
  emailRevenue: number;
  lastOrderDate: Date;
}
