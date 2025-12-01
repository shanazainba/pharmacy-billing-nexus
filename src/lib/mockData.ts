import { Order, Clinic, CreditUsage, ClinicOrderSummary } from '@/types';

// Mock pharmacies
export const mockPharmacies = [
  'Central Pharmacy',
  'MedCare Pharmacy',
  'HealthPlus Pharmacy',
  'Wellness Pharmacy',
  'CarePoint Pharmacy',
];

export const mockClinics: Clinic[] = [
  {
    id: 'c1',
    name: 'Riverside Medical Center',
    location: 'Downtown',
    contactPerson: 'Dr. Sarah Johnson',
    contactEmail: 'sarah.j@riverside.med',
  },
  {
    id: 'c2',
    name: 'Oakwood Family Clinic',
    location: 'Westside',
    contactPerson: 'Dr. Michael Chen',
    contactEmail: 'mchen@oakwood.clinic',
  },
  {
    id: 'c3',
    name: 'Greenfield Health Center',
    location: 'North District',
    contactPerson: 'Dr. Emily Rodriguez',
    contactEmail: 'emily.r@greenfield.health',
  },
  {
    id: 'c4',
    name: 'Summit Wellness Clinic',
    location: 'East End',
    contactPerson: 'Dr. James Wilson',
    contactEmail: 'jwilson@summit.wellness',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    orderNumber: 'ORD-2024-001',
    clinicId: 'c1',
    clinicName: 'Riverside Medical Center',
    date: new Date('2024-01-15'),
    status: 'completed',
    itemsCount: 45,
    totalAmount: 3250.00,
    credits: 65,
    fulfillmentPharmacy: 'Central Pharmacy',
  },
  {
    id: 'o2',
    orderNumber: 'ORD-2024-002',
    clinicId: 'c2',
    clinicName: 'Oakwood Family Clinic',
    date: new Date('2024-01-18'),
    status: 'processing',
    itemsCount: 32,
    totalAmount: 2180.00,
    credits: 44,
    fulfillmentPharmacy: 'MedCare Pharmacy',
  },
  {
    id: 'o3',
    orderNumber: 'ORD-2024-003',
    clinicId: 'c1',
    clinicName: 'Riverside Medical Center',
    date: new Date('2024-01-20'),
    status: 'completed',
    itemsCount: 28,
    totalAmount: 1890.00,
    credits: 38,
    fulfillmentPharmacy: 'Central Pharmacy',
  },
  {
    id: 'o4',
    orderNumber: 'ORD-2024-004',
    clinicId: 'c3',
    clinicName: 'Greenfield Health Center',
    date: new Date('2024-01-22'),
    status: 'pending',
    itemsCount: 52,
    totalAmount: 4120.00,
    credits: 82,
    fulfillmentPharmacy: 'HealthPlus Pharmacy',
  },
  {
    id: 'o5',
    orderNumber: 'ORD-2024-005',
    clinicId: 'c4',
    clinicName: 'Summit Wellness Clinic',
    date: new Date('2024-01-25'),
    status: 'completed',
    itemsCount: 38,
    totalAmount: 2650.00,
    credits: 53,
    fulfillmentPharmacy: 'Wellness Pharmacy',
  },
  {
    id: 'o6',
    orderNumber: 'ORD-2024-006',
    clinicId: 'c2',
    clinicName: 'Oakwood Family Clinic',
    date: new Date('2024-01-27'),
    status: 'processing',
    itemsCount: 41,
    totalAmount: 2980.00,
    credits: 60,
    fulfillmentPharmacy: 'MedCare Pharmacy',
  },
  {
    id: 'o7',
    orderNumber: 'ORD-2024-007',
    clinicId: 'c3',
    clinicName: 'Greenfield Health Center',
    date: new Date('2024-01-28'),
    status: 'cancelled',
    itemsCount: 15,
    totalAmount: 950.00,
    credits: 19,
    fulfillmentPharmacy: 'HealthPlus Pharmacy',
  },
  // Add recent orders for today
  {
    id: 'o8',
    orderNumber: 'ORD-2024-008',
    clinicId: 'c1',
    clinicName: 'Riverside Medical Center',
    date: new Date(),
    status: 'completed',
    itemsCount: 35,
    totalAmount: 2450.00,
    credits: 49,
    fulfillmentPharmacy: 'Central Pharmacy',
  },
  {
    id: 'o9',
    orderNumber: 'ORD-2024-009',
    clinicId: 'c4',
    clinicName: 'Summit Wellness Clinic',
    date: new Date(),
    status: 'pending',
    itemsCount: 22,
    totalAmount: 1650.00,
    credits: 33,
    fulfillmentPharmacy: 'Wellness Pharmacy',
  },
];

export const mockCreditUsage: CreditUsage[] = [
  {
    clinicId: 'c1',
    clinicName: 'Riverside Medical Center',
    whatsappMessages: 1250,
    emailMessages: 850,
    whatsappRevenue: 2500.00,
    emailRevenue: 1700.00,
    lastOrderDate: new Date('2024-01-20'),
  },
  {
    clinicId: 'c2',
    clinicName: 'Oakwood Family Clinic',
    whatsappMessages: 1180,
    emailMessages: 920,
    whatsappRevenue: 2360.00,
    emailRevenue: 1840.00,
    lastOrderDate: new Date('2024-01-27'),
  },
  {
    clinicId: 'c3',
    clinicName: 'Greenfield Health Center',
    whatsappMessages: 1420,
    emailMessages: 780,
    whatsappRevenue: 2840.00,
    emailRevenue: 1560.00,
    lastOrderDate: new Date('2024-01-28'),
  },
  {
    clinicId: 'c4',
    clinicName: 'Summit Wellness Clinic',
    whatsappMessages: 890,
    emailMessages: 650,
    whatsappRevenue: 1780.00,
    emailRevenue: 1300.00,
    lastOrderDate: new Date('2024-01-25'),
  },
];

// Generate clinic order summaries
export const getClinicOrderSummaries = (): ClinicOrderSummary[] => {
  const clinicMap = new Map<string, ClinicOrderSummary>();
  
  mockOrders.forEach(order => {
    const existing = clinicMap.get(order.clinicId);
    if (!existing || order.date > existing.lastOrderDate) {
      clinicMap.set(order.clinicId, {
        clinicId: order.clinicId,
        clinicName: order.clinicName,
        lastOrderDate: order.date,
        fulfillmentPharmacy: order.fulfillmentPharmacy,
        status: order.status,
        totalOrders: mockOrders.filter(o => o.clinicId === order.clinicId).length,
      });
    }
  });
  
  return Array.from(clinicMap.values());
};
