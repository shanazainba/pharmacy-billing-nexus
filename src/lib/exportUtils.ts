import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order, CreditUsage } from '@/types';
import { format } from 'date-fns';

export const exportOrdersToExcel = (orders: Order[], filename = 'clinic_orders.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    orders.map(order => ({
      'Order Number': order.orderNumber,
      'Clinic Name': order.clinicName,
      'Date': format(order.date, 'yyyy-MM-dd'),
      'Status': order.status.toUpperCase(),
      'Items Count': order.itemsCount,
      'Total Amount': `$${order.totalAmount.toFixed(2)}`,
      'Credits Used': order.credits,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
  XLSX.writeFile(workbook, filename);
};

export const exportOrdersToPDF = (orders: Order[], filename = 'clinic_orders.pdf') => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Clinic Orders Report', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 14, 32);

  autoTable(doc, {
    startY: 40,
    head: [['Order #', 'Clinic', 'Date', 'Status', 'Items', 'Amount', 'Credits']],
    body: orders.map(order => [
      order.orderNumber,
      order.clinicName,
      format(order.date, 'MM/dd/yyyy'),
      order.status.toUpperCase(),
      order.itemsCount,
      `$${order.totalAmount.toFixed(2)}`,
      order.credits,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [20, 184, 166] },
  });

  doc.save(filename);
};

export const exportCreditUsageToExcel = (creditUsage: CreditUsage[], filename = 'credit_billing.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    creditUsage.map(usage => ({
      'Clinic Name': usage.clinicName,
      'Credits Used': usage.creditsUsed,
      'Total Orders': usage.totalOrders,
      'Last Order Date': format(usage.lastOrderDate, 'yyyy-MM-dd'),
      'Amount Billed': `$${usage.amountBilled.toFixed(2)}`,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Credit Usage');
  XLSX.writeFile(workbook, filename);
};

export const exportCreditUsageToPDF = (creditUsage: CreditUsage[], filename = 'credit_billing.pdf') => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Credit Billing Report', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 14, 32);

  const totalCredits = creditUsage.reduce((sum, usage) => sum + usage.creditsUsed, 0);
  const totalAmount = creditUsage.reduce((sum, usage) => sum + usage.amountBilled, 0);

  doc.setFontSize(12);
  doc.text(`Total Credits Consumed: ${totalCredits}`, 14, 42);
  doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, 50);

  autoTable(doc, {
    startY: 60,
    head: [['Clinic', 'Credits', 'Orders', 'Last Order', 'Amount']],
    body: creditUsage.map(usage => [
      usage.clinicName,
      usage.creditsUsed,
      usage.totalOrders,
      format(usage.lastOrderDate, 'MM/dd/yyyy'),
      `$${usage.amountBilled.toFixed(2)}`,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [20, 184, 166] },
  });

  doc.save(filename);
};
