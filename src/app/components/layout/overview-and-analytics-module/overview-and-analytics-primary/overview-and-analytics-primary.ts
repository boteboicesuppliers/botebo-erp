import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-and-analytics-primary-view',
  imports: [],
  templateUrl: './overview-and-analytics-primary.html',
  styleUrl: './overview-and-analytics-primary.css',
})
export class OverviewAndAnalyticsPrimary {
  // KPI SUMMARY
  kpis = [
    { label: 'Total Open Orders', value: '128', change: '+12.8%', detail: 'Compared to last month', icon: 'orders', color: 'blue' },
    { label: 'Due Deliveries', value: '24', change: '8 due today', detail: 'Across all active orders', icon: 'delivery', color: 'orange' },
    { label: 'Low Stock Items', value: '17', change: '5 critical', detail: 'Items below reorder level', icon: 'inventory', color: 'red' },
    { label: 'Unpaid Invoices', value: '39', change: 'R148.2k total', detail: '11 overdue accounts', icon: 'invoice', color: 'blue' },
    { label: 'Pending Quotations', value: '22', change: 'R215.0k value', detail: 'Awaiting customer response', icon: 'quotation', color: 'blue' },
    { label: 'Open Purchase Orders', value: '14', change: '6 arriving soon', detail: 'From active suppliers', icon: 'purchase', color: 'blue' },
    { label: 'Stock Alerts', value: '5', change: 'Immediate action', detail: 'Reorder thresholds breached', icon: 'warning', color: 'red' },
    { label: 'Receivables Due', value: 'R148.2k', change: '+6.4%', detail: 'Current open billing balance', icon: 'receivables', color: 'blue' },
  ];

  // OPEN ORDERS OVERVIEW
  orderStatuses = [
    { label: 'New', count: 42, color: '#2563eb' },
    { label: 'Confirmed', count: 28, color: '#0891b2' },
    { label: 'In Progress', count: 34, color: '#7c3aed' },
    { label: 'Pending', count: 13, color: '#d97706' },
    { label: 'Delayed', count: 11, color: '#dc2626' },
  ];

  // UPCOMING DELIVERIES
  upcomingDeliveries = [
    { id: 'DLV-4091', order: 'SO-8821', customer: 'Highveld Cold Chain', destination: 'Pretoria North Depot', date: '2026-11-22', time: '08:30', status: 'Scheduled' },
    { id: 'DLV-4092', order: 'SO-8824', customer: 'Mamelodi SuperSpar', destination: 'Mamelodi East', date: '2026-11-22', time: '10:00', status: 'In Transit' },
    { id: 'DLV-4093', order: 'SO-8829', customer: 'Suncrest Hospitality', destination: 'Menlyn Hub', date: '2026-11-22', time: '13:15', status: 'Scheduled' },
    { id: 'DLV-4094', order: 'SO-8833', customer: 'AquaCold Events', destination: 'Centurion Warehouse', date: '2026-11-23', time: '07:45', status: 'Pending' },
    { id: 'DLV-4095', order: 'SO-8837', customer: 'Metro Forecourt Group', destination: 'Midrand Distribution', date: '2026-11-23', time: '11:30', status: 'Scheduled' },
  ];

  // RECENT SALES ORDERS
  recentSalesOrders = [
    { id: 'SO-8837', customer: 'Metro Forecourt Group', date: '2026-11-22', amount: 'R24,800', status: 'Confirmed' },
    { id: 'SO-8833', customer: 'AquaCold Events', date: '2026-11-22', amount: 'R16,450', status: 'Pending' },
    { id: 'SO-8829', customer: 'Suncrest Hospitality', date: '2026-11-21', amount: 'R31,200', status: 'In Progress' },
    { id: 'SO-8824', customer: 'Mamelodi SuperSpar', date: '2026-11-21', amount: 'R19,600', status: 'In Transit' },
    { id: 'SO-8821', customer: 'Highveld Cold Chain', date: '2026-11-20', amount: 'R42,150', status: 'Completed' },
  ];

  // RECENT PURCHASE ORDERS
  recentPurchaseOrders = [
    { id: 'PO-3041', supplier: 'Apex FlexiPack', date: '2026-11-22', amount: 'R33,750', status: 'Confirmed' },
    { id: 'PO-3038', supplier: 'PureFlow Water Systems', date: '2026-11-20', amount: 'R18,400', status: 'Completed' },
    { id: 'PO-3035', supplier: 'HydroChem Industrial', date: '2026-11-18', amount: 'R12,500', status: 'Pending' },
    { id: 'PO-3031', supplier: 'Arctic Compressor Spares', date: '2026-11-16', amount: 'R27,900', status: 'In Transit' },
  ];

  // RECENT QUOTATIONS
  recentQuotations = [
    { id: 'QT-5190', customer: 'Sandton Event Co.', date: '2026-11-22', amount: 'R54,000', status: 'Pending' },
    { id: 'QT-5186', customer: 'Tshwane Beverage Hub', date: '2026-11-21', amount: 'R68,500', status: 'Confirmed' },
    { id: 'QT-5182', customer: 'Kempton Cash & Carry', date: '2026-11-20', amount: 'R47,200', status: 'Pending' },
    { id: 'QT-5179', customer: 'Rosslyn Industrial', date: '2026-11-19', amount: 'R45,300', status: 'Delayed' },
  ];

  // RECENT INVOICES
  recentInvoices = [
    { id: 'INV-9018', customer: 'Highveld Cold Chain', due: '2026-12-05', amount: 'R42,150', status: 'Pending' },
    { id: 'INV-9014', customer: 'Mamelodi SuperSpar', due: '2026-11-28', amount: 'R19,600', status: 'Completed' },
    { id: 'INV-9009', customer: 'Suncrest Hospitality', due: '2026-11-14', amount: 'R31,200', status: 'Delayed' },
    { id: 'INV-9002', customer: 'AquaCold Events', due: '2026-11-10', amount: 'R16,450', status: 'Delayed' },
  ];

  // DELIVERY TRACKING
  deliveryTracking = [
    { id: 'DLV-4092', customer: 'Mamelodi SuperSpar', destination: 'Mamelodi East', stage: 'In Transit', progress: 70, eta: '10:00' },
    { id: 'DLV-4091', customer: 'Highveld Cold Chain', destination: 'Pretoria North Depot', stage: 'Scheduled', progress: 35, eta: '08:30' },
    { id: 'DLV-4093', customer: 'Suncrest Hospitality', destination: 'Menlyn Hub', stage: 'Scheduled', progress: 20, eta: '13:15' },
    { id: 'DLV-4094', customer: 'AquaCold Events', destination: 'Centurion Warehouse', stage: 'Pending', progress: 10, eta: 'Tomorrow, 07:45' },
  ];

  // INVENTORY MOVEMENTS
  inventoryMovements = [
    { item: '2kg Party Cube Ice Bag', sku: 'FG-ICE-02', reference: 'BCH-1122A', type: 'Production Receipt', quantity: '+1,450', date: '2026-11-22' },
    { item: 'Food-Grade 2kg Poly Bag Roll', sku: 'RM-POL-20', reference: 'GRN-109', type: 'Purchase Receipt', quantity: '+45', date: '2026-11-22' },
    { item: '5kg Commercial Cube Ice Bag', sku: 'FG-ICE-05', reference: 'SO-8824', type: 'Sales Dispatch', quantity: '-350', date: '2026-11-21' },
    { item: '2kg Party Cube Ice Bag', sku: 'FG-ICE-02', reference: 'REJ-014', type: 'Quality Rejection', quantity: '-48', date: '2026-11-20' },
    { item: '10kg Block Ice', sku: 'FG-BLK-10', reference: 'BCH-1120B', type: 'Production Receipt', quantity: '+210', date: '2026-11-20' },
  ];

  // FINANCIAL SUMMARY
  financialSummary = [
    { label: 'Monthly Revenue', value: 'R412.8k', change: '+14.2%', description: 'vs. prior month', positive: true },
    { label: 'Net Cash Position', value: 'R264.5k', change: '+8.9%', description: 'Operating bank balance', positive: true },
    { label: 'Accounts Receivable', value: 'R148.2k', change: '39 open', description: 'Customer invoices', positive: false },
    { label: 'Accounts Payable', value: 'R92.7k', change: '14 open', description: 'Supplier bills', positive: false },
  ];

  // MONTHLY SALES PERFORMANCE
  monthlySales = [
    { month: 'Jun', sales: 58, target: 65 },
    { month: 'Jul', sales: 66, target: 68 },
    { month: 'Aug', sales: 72, target: 70 },
    { month: 'Sep', sales: 69, target: 74 },
    { month: 'Oct', sales: 81, target: 78 },
    { month: 'Nov', sales: 88, target: 82 },
  ];

  // REVENUE BREAKDOWN
  revenueBreakdown = [
    { label: 'Party & Commercial Cube Ice', amount: 'R248.4k', percentage: 60 },
    { label: 'Block Ice & Event Supply', amount: 'R103.2k', percentage: 25 },
    { label: 'Contract & Bulk Accounts', amount: 'R61.2k', percentage: 15 },
  ];

  // OVERDUE INVOICES
  overdueInvoices = [
    { id: 'INV-9002', customer: 'AquaCold Events', due: '2026-11-10', days: 12, amount: 'R16,450' },
    { id: 'INV-9009', customer: 'Suncrest Hospitality', due: '2026-11-14', days: 8, amount: 'R31,200' },
    { id: 'INV-8994', customer: 'Rosslyn Industrial', due: '2026-11-16', days: 6, amount: 'R22,800' },
    { id: 'INV-8998', customer: 'Kempton Cash & Carry', due: '2026-11-18', days: 4, amount: 'R18,950' },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
      case 'Confirmed':
        return 'bg-[#dcfce7] text-[#15803d]';
      case 'In Transit':
      case 'In Progress':
      case 'Scheduled':
        return 'bg-[#dbeafe] text-[#1d4ed8]';
      case 'Pending':
        return 'bg-[#fef3c7] text-[#b45309]';
      case 'Delayed':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-[#e1e6ed] text-[#374151]';
    }
  }
}