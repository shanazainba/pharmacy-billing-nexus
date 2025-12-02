import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order, CreditUsage, ClinicOrderSummary } from '@/types';
import { format } from 'date-fns';

export const exportOrdersToExcel = (orders: Order[], filename = 'clinic_orders.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    orders.map(order => ({
      'Order Number': order.orderNumber,
      'Clinic Name': order.clinicName,
      'Date': format(order.date, 'yyyy-MM-dd'),
      'Status': order.status.toUpperCase(),
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
    head: [['Order #', 'Clinic', 'Date', 'Status', 'Credits']],
    body: orders.map(order => [
      order.orderNumber,
      order.clinicName,
      format(order.date, 'MM/dd/yyyy'),
      order.status.toUpperCase(),
      order.credits,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [20, 184, 166] },
  });

  doc.save(filename);
};

export const exportCreditUsageToExcel = (creditUsage: CreditUsage[], filename = 'communications.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    creditUsage.map(usage => ({
      'Clinic Name': usage.clinicName,
      'WhatsApp Messages': usage.whatsappMessages,
      'Email Messages': usage.emailMessages,
      'Total Messages': usage.whatsappMessages + usage.emailMessages,
      'Revenue Generated': `$${(usage.whatsappRevenue + usage.emailRevenue).toFixed(2)}`,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Communications');
  XLSX.writeFile(workbook, filename);
};

export const exportCreditUsageToPDF = (creditUsage: CreditUsage[], filename = 'communications.pdf') => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Communications Report', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 14, 32);

  const totalWhatsapp = creditUsage.reduce((sum, usage) => sum + usage.whatsappMessages, 0);
  const totalEmail = creditUsage.reduce((sum, usage) => sum + usage.emailMessages, 0);
  const totalMessages = totalWhatsapp + totalEmail;

  doc.setFontSize(12);
  doc.text(`Total WhatsApp Messages: ${totalWhatsapp.toLocaleString()}`, 14, 42);
  doc.text(`Total Email Messages: ${totalEmail.toLocaleString()}`, 14, 50);
  doc.text(`Total Messages: ${totalMessages.toLocaleString()}`, 14, 58);

  autoTable(doc, {
    startY: 68,
    head: [['Clinic', 'WhatsApp', 'Email', 'Total', 'Revenue']],
    body: creditUsage.map(usage => [
      usage.clinicName,
      usage.whatsappMessages.toLocaleString(),
      usage.emailMessages.toLocaleString(),
      (usage.whatsappMessages + usage.emailMessages).toLocaleString(),
      `$${(usage.whatsappRevenue + usage.emailRevenue).toFixed(2)}`,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [20, 184, 166] },
  });

  doc.save(filename);
};

export const exportClinicSummariesToExcel = (summaries: ClinicOrderSummary[], filename = 'clinic_summaries.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    summaries.map(summary => ({
      'Clinic Name': summary.clinicName,
      'Last Order Date': format(summary.lastOrderDate, 'yyyy-MM-dd'),
      'Fulfillment Pharmacy': summary.fulfillmentPharmacy,
      'Total Orders': summary.totalOrders,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clinic Summaries');
  XLSX.writeFile(workbook, filename);
};

export const exportClinicSummariesToPDF = (summaries: ClinicOrderSummary[], filename = 'clinic_summaries.pdf') => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Clinic Order Summaries', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 14, 32);

  autoTable(doc, {
    startY: 40,
    head: [['Clinic', 'Last Order', 'Pharmacy', 'Total Orders']],
    body: summaries.map(summary => [
      summary.clinicName,
      format(summary.lastOrderDate, 'MM/dd/yyyy'),
      summary.fulfillmentPharmacy,
      summary.totalOrders,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [20, 184, 166] },
  });

  doc.save(filename);
};
