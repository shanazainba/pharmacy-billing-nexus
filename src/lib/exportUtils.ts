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

export const exportCreditUsageToExcel = (creditUsage: CreditUsage[], filename = 'message_billing.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    creditUsage.map(usage => ({
      'Clinic Name': usage.clinicName,
      'WhatsApp Messages': usage.whatsappMessages,
      'Email Messages': usage.emailMessages,
      'Last Order Date': format(usage.lastOrderDate, 'yyyy-MM-dd'),
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Message Usage');
  XLSX.writeFile(workbook, filename);
};

export const exportCreditUsageToPDF = (creditUsage: CreditUsage[], filename = 'message_billing.pdf') => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Message Billing Report', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 14, 32);

  const totalWhatsapp = creditUsage.reduce((sum, usage) => sum + usage.whatsappMessages, 0);
  const totalEmail = creditUsage.reduce((sum, usage) => sum + usage.emailMessages, 0);

  doc.setFontSize(12);
  doc.text(`Total WhatsApp Messages: ${totalWhatsapp.toLocaleString()}`, 14, 42);
  doc.text(`Total Email Messages: ${totalEmail.toLocaleString()}`, 14, 50);

  autoTable(doc, {
    startY: 60,
    head: [['Clinic', 'WhatsApp', 'Email', 'Last Order']],
    body: creditUsage.map(usage => [
      usage.clinicName,
      usage.whatsappMessages.toLocaleString(),
      usage.emailMessages.toLocaleString(),
      format(usage.lastOrderDate, 'MM/dd/yyyy'),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [20, 184, 166] },
  });

  doc.save(filename);
};
