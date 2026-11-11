
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // KPI SUMMARY
  kpis = [
    { label: 'Total Open Orders', value: '128', change: '+12.8%', detail: 'Compared to last month', icon: 'orders', color: 'blue' },
    { label: 'Due Deliveries', value: '24', change: '8 due today', detail: 'Across all active orders', icon: 'delivery', color: 'orange' },
    { label: 'Low Stock Items', value: '17', change: '5 critical', detail: 'Items below reorder level', icon: 'inventory', color: 'red' },
    { label: 'Unpaid Invoices', value: '36', change: 'R 284,500', detail: 'Total outstanding amount', icon: 'invoice', color: 'purple' },
    { label: 'Pending Quotations', value: '19', change: 'R 412,800', detail: 'Awaiting customer response', icon: 'quotation', color: 'cyan' },
    { label: 'Pending Purchase Orders', value: '12', change: '4 awaiting approval', detail: 'Supplier orders in progress', icon: 'purchase', color: 'indigo' },
    { label: 'Overdue Deliveries', value: '6', change: 'Requires attention', detail: 'Past expected delivery date', icon: 'warning', color: 'red' },
    { label: 'Outstanding Receivables', value: 'R 684,250', change: '+4.2%', detail: 'Total accounts receivable', icon: 'receivables', color: 'green' },
  ];

  // OPEN ORDERS OVERVIEW
  orderStatuses = [
    { label: 'Processing', count: 42, percentage: 33, color: '#2563eb' },
    { label: 'Ready for Dispatch', count: 28, percentage: 22, color: '#0891b2' },
    { label: 'Dispatched', count: 35, percentage: 27, color: '#7c3aed' },
    { label: 'On Hold', count: 13, percentage: 10, color: '#d97706' },
    { label: 'Awaiting Stock', count: 10, percentage: 8, color: '#dc2626' },
  ];

  // UPCOMING DELIVERIES
  upcomingDeliveries = [
    { id: 'DEL-1048', order: 'SO-2081', customer: 'Mabena Industrial', destination: 'Johannesburg, GP', date: '12 Nov 2026', time: '09:00', status: 'Scheduled' },
    { id: 'DEL-1049', order: 'SO-2084', customer: 'Cape Engineering', destination: 'Cape Town, WC', date: '12 Nov 2026', time: '11:30', status: 'In Transit' },
    { id: 'DEL-1050', order: 'SO-2088', customer: 'Pretoria Hardware', destination: 'Pretoria, GP', date: '12 Nov 2026', time: '13:00', status: 'Scheduled' },
    { id: 'DEL-1051', order: 'SO-2090', customer: 'Durban Supplies', destination: 'Durban, KZN', date: '13 Nov 2026', time: '08:30', status: 'Preparing' },
    { id: 'DEL-1052', order: 'SO-2092', customer: 'Nelspruit Traders', destination: 'Mbombela, MP', date: '13 Nov 2026', time: '10:00', status: 'Scheduled' },
  ];

  // RECENT SALES ORDERS
  recentSalesOrders = [
    { id: 'SO-2094', customer: 'Mabena Industrial', date: '12 Nov 2026', amount: 'R 48,500', status: 'Processing' },
    { id: 'SO-2093', customer: 'Cape Engineering', date: '12 Nov 2026', amount: 'R 126,000', status: 'Confirmed' },
    { id: 'SO-2092', customer: 'Nelspruit Traders', date: '11 Nov 2026', amount: 'R 32,750', status: 'Dispatched' },
    { id: 'SO-2091', customer: 'Pretoria Hardware', date: '11 Nov 2026', amount: 'R 18,900', status: 'Pending' },
    { id: 'SO-2090', customer: 'Durban Supplies', date: '10 Nov 2026', amount: 'R 74,200', status: 'Processing' },
  ];

  // RECENT PURCHASE ORDERS
  recentPurchaseOrders = [
    { id: 'PO-1082', supplier: 'Industrial Components SA', date: '12 Nov 2026', amount: 'R 82,400', status: 'Awaiting Approval' },
    { id: 'PO-1081', supplier: 'National Steel Distributors', date: '11 Nov 2026', amount: 'R 154,000', status: 'Approved' },
    { id: 'PO-1080', supplier: 'Tech Warehouse', date: '10 Nov 2026', amount: 'R 26,500', status: 'Ordered' },
    { id: 'PO-1079', supplier: 'Cape Wholesale Group', date: '09 Nov 2026', amount: 'R 41,800', status: 'Partially Received' },
  ];

  // RECENT QUOTATIONS
  recentQuotations = [
    { id: 'QT-3041', customer: 'Mabena Industrial', date: '12 Nov 2026', amount: 'R 68,500', status: 'Awaiting Response' },
    { id: 'QT-3040', customer: 'Pretoria Hardware', date: '11 Nov 2026', amount: 'R 24,900', status: 'Sent' },
    { id: 'QT-3039', customer: 'Cape Engineering', date: '10 Nov 2026', amount: 'R 112,000', status: 'Accepted' },
    { id: 'QT-3038', customer: 'Durban Supplies', date: '09 Nov 2026', amount: 'R 39,750', status: 'Expired' },
  ];

  // RECENT INVOICES
  recentInvoices = [
    { id: 'INV-5028', customer: 'Cape Engineering', date: '12 Nov 2026', due: '26 Nov 2026', amount: 'R 126,000', status: 'Unpaid' },
    { id: 'INV-5027', customer: 'Nelspruit Traders', date: '11 Nov 2026', due: '25 Nov 2026', amount: 'R 32,750', status: 'Paid' },
    { id: 'INV-5026', customer: 'Mabena Industrial', date: '10 Nov 2026', due: '24 Nov 2026', amount: 'R 48,500', status: 'Overdue' },
    { id: 'INV-5025', customer: 'Pretoria Hardware', date: '09 Nov 2026', due: '23 Nov 2026', amount: 'R 18,900', status: 'Partially Paid' },
  ];

  // DELIVERY TRACKING
  deliveryTracking = [
    { id: 'DEL-1049', customer: 'Cape Engineering', destination: 'Cape Town, WC', progress: 72, stage: 'In Transit', eta: 'Today, 11:30' },
    { id: 'DEL-1046', customer: 'Mabena Industrial', destination: 'Johannesburg, GP', progress: 100, stage: 'Delivered', eta: 'Completed' },
    { id: 'DEL-1045', customer: 'Durban Supplies', destination: 'Durban, KZN', progress: 38, stage: 'In Transit', eta: '13 Nov, 14:00' },
    { id: 'DEL-1043', customer: 'Pretoria Hardware', destination: 'Pretoria, GP', progress: 15, stage: 'Dispatched', eta: '13 Nov, 09:00' },
  ];

  // INVENTORY MOVEMENT
  inventoryMovements = [
    { item: 'Industrial Steel Rods', sku: 'STL-0012', type: 'Stock Received', quantity: '+250 units', date: '12 Nov 2026', reference: 'GRN-2041' },
    { item: 'Hydraulic Pump Assembly', sku: 'HYD-0048', type: 'Stock Issued', quantity: '-12 units', date: '12 Nov 2026', reference: 'SO-2092' },
    { item: 'Copper Electrical Cable', sku: 'CAB-0021', type: 'Stock Received', quantity: '+500 units', date: '11 Nov 2026', reference: 'GRN-2040' },
    { item: 'Safety Equipment Kit', sku: 'SAF-0008', type: 'Stock Issued', quantity: '-35 units', date: '11 Nov 2026', reference: 'SO-2091' },
    { item: 'Industrial Bearings', sku: 'BRG-0033', type: 'Stock Adjustment', quantity: '-4 units', date: '10 Nov 2026', reference: 'ADJ-0082' },
  ];

  // FINANCIAL SUMMARIES
  financialSummary = [
    { label: 'Revenue This Month', value: 'R 1,284,500', change: '+12.6%', description: 'Compared to previous month', positive: true },
    { label: 'Accounts Receivable', value: 'R 684,250', change: '36 invoices', description: 'Awaiting customer payment', positive: false },
    { label: 'Accounts Payable', value: 'R 392,800', change: '18 bills', description: 'Outstanding supplier balances', positive: false },
    { label: 'Net Cash Flow', value: 'R 218,400', change: '+8.3%', description: 'Current month net movement', positive: true },
  ];

  // MONTHLY SALES CHART
  monthlySales = [
    { month: 'Jun', sales: 62, target: 55 },
    { month: 'Jul', sales: 70, target: 60 },
    { month: 'Aug', sales: 58, target: 65 },
    { month: 'Sep', sales: 82, target: 70 },
    { month: 'Oct', sales: 76, target: 75 },
    { month: 'Nov', sales: 91, target: 80 },
  ];

  // REVENUE BREAKDOWN
  revenueBreakdown = [
    { label: 'Product Sales', amount: 'R 842,500', percentage: 66 },
    { label: 'Services', amount: 'R 282,000', percentage: 22 },
    { label: 'Logistics', amount: 'R 160,000', percentage: 12 },
  ];

  // OVERDUE INVOICES
  overdueInvoices = [
    { id: 'INV-5018', customer: 'Mabena Industrial', due: '28 Oct 2026', days: 15, amount: 'R 48,500' },
    { id: 'INV-5012', customer: 'Cape Engineering', due: '31 Oct 2026', days: 12, amount: 'R 76,000' },
    { id: 'INV-5007', customer: 'Durban Supplies', due: '02 Nov 2026', days: 10, amount: 'R 32,800' },
    { id: 'INV-4998', customer: 'Pretoria Hardware', due: '05 Nov 2026', days: 7, amount: 'R 18,900' },
  ];

  getStatusClass(status: string): string {
    const normalized = status.toLowerCase();

    if (['paid', 'accepted', 'approved', 'delivered', 'confirmed'].includes(normalized)) {
      return 'bg-green-100 text-green-800';
    }

    if (['overdue', 'expired', 'on hold'].includes(normalized)) {
      return 'bg-red-100 text-red-800';
    }

    if (['in transit', 'dispatched', 'ordered', 'partially received'].includes(normalized)) {
      return 'bg-blue-100 text-blue-800';
    }

    if (['awaiting approval', 'awaiting response', 'pending', 'preparing'].includes(normalized)) {
      return 'bg-amber-100 text-amber-800';
    }

    return 'bg-slate-100 text-slate-800';
  }
}
