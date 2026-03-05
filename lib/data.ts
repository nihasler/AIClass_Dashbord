// =============================================================
// SAMPLE DATA — AI for Business Leaders (Week 2: Frontend)
// =============================================================
// Paste this into your Next.js project (e.g., src/lib/data.ts)
// and import from your dashboard components.
// Feel free to change names, numbers, and categories to match
// your business!
// =============================================================

// --- Metric Cards ---
export const metrics = [
  {
    title: "Total Revenue",
    value: "SAR 284,500",
    change: "+12.5%",
    trend: "up",
    period: "vs last month",
  },
  {
    title: "Active Customers",
    value: "1,847",
    change: "+8.2%",
    trend: "up",
    period: "vs last month",
  },
  {
    title: "Growth Rate",
    value: "15.3%",
    change: "+2.1%",
    trend: "up",
    period: "vs last quarter",
  },
  {
    title: "Avg Order Value",
    value: "SAR 154",
    change: "-3.4%",
    trend: "down",
    period: "vs last month",
  },
];

// --- Monthly Revenue (Line/Bar Chart — past 12 months) ---
export const monthlyRevenue = [
  { month: "Mar 2025", revenue: 165000, expenses: 98000 },
  { month: "Apr 2025", revenue: 178000, expenses: 102000 },
  { month: "May 2025", revenue: 152000, expenses: 95000 },
  { month: "Jun 2025", revenue: 195000, expenses: 108000 },
  { month: "Jul 2025", revenue: 210000, expenses: 112000 },
  { month: "Aug 2025", revenue: 188000, expenses: 105000 },
  { month: "Sep 2025", revenue: 225000, expenses: 118000 },
  { month: "Oct 2025", revenue: 240000, expenses: 125000 },
  { month: "Nov 2025", revenue: 258000, expenses: 130000 },
  { month: "Dec 2025", revenue: 275000, expenses: 142000 },
  { month: "Jan 2026", revenue: 262000, expenses: 135000 },
  { month: "Feb 2026", revenue: 284500, expenses: 138000 },
];

// --- Weekly Active Users (Area Chart) ---
export const weeklyUsers = [
  { week: "Week 1", users: 1205 },
  { week: "Week 2", users: 1340 },
  { week: "Week 3", users: 1289 },
  { week: "Week 4", users: 1456 },
  { week: "Week 5", users: 1380 },
  { week: "Week 6", users: 1520 },
  { week: "Week 7", users: 1610 },
  { week: "Week 8", users: 1578 },
  { week: "Week 9", users: 1690 },
  { week: "Week 10", users: 1745 },
  { week: "Week 11", users: 1802 },
  { week: "Week 12", users: 1847 },
];

// --- Sales by Category (Pie/Donut Chart) ---
export const salesByCategory = [
  { category: "Electronics", value: 95000, color: "#10b981" },
  { category: "Clothing", value: 62000, color: "#6366f1" },
  { category: "Home & Garden", value: 48000, color: "#f59e0b" },
  { category: "Food & Beverage", value: 44500, color: "#ef4444" },
  { category: "Services", value: 35000, color: "#8b5cf6" },
];

// --- Recent Orders (Table) ---
export const recentOrders = [
  {
    id: "ORD-2847",
    customer: "Ahmed Al-Rashid",
    product: "Smart Home Kit",
    amount: "SAR 1,250",
    status: "Completed",
    date: "2026-02-28",
  },
  {
    id: "ORD-2846",
    customer: "Fatima Hassan",
    product: "Premium Abaya Set",
    amount: "SAR 890",
    status: "Processing",
    date: "2026-02-28",
  },
  {
    id: "ORD-2845",
    customer: "Mohammed Al-Saud",
    product: "Office Furniture Bundle",
    amount: "SAR 3,400",
    status: "Completed",
    date: "2026-02-27",
  },
  {
    id: "ORD-2844",
    customer: "Sara Al-Dosari",
    product: "Organic Tea Collection",
    amount: "SAR 175",
    status: "Shipped",
    date: "2026-02-27",
  },
  {
    id: "ORD-2843",
    customer: "Khalid Ibrahim",
    product: "Laptop Stand Pro",
    amount: "SAR 320",
    status: "Completed",
    date: "2026-02-26",
  },
  {
    id: "ORD-2842",
    customer: "Noura Al-Qahtani",
    product: "Fitness Tracker X",
    amount: "SAR 445",
    status: "Processing",
    date: "2026-02-26",
  },
  {
    id: "ORD-2841",
    customer: "Omar Badr",
    product: "Wireless Speaker Set",
    amount: "SAR 680",
    status: "Completed",
    date: "2026-02-25",
  },
  {
    id: "ORD-2840",
    customer: "Lina Al-Harbi",
    product: "Skincare Bundle",
    amount: "SAR 520",
    status: "Shipped",
    date: "2026-02-25",
  },
];

// --- Reports (for Reports page) ---
export const reports = [
  {
    id: 1,
    title: "Monthly Revenue Analysis",
    category: "Finance",
    date: "2026-02-28",
    summary:
      "Revenue increased 12.5% month-over-month, driven by strong electronics sales and holiday promotions.",
  },
  {
    id: 2,
    title: "Customer Acquisition Report",
    category: "Marketing",
    date: "2026-02-25",
    summary:
      "247 new customers acquired this month. Social media campaigns drove 62% of new signups.",
  },
  {
    id: 3,
    title: "Inventory Status Update",
    category: "Operations",
    date: "2026-02-22",
    summary:
      "3 SKUs below minimum threshold. Restocking orders placed for Smart Home Kit and Fitness Tracker.",
  },
  {
    id: 4,
    title: "Q4 Performance Summary",
    category: "Finance",
    date: "2026-02-18",
    summary:
      "Q4 exceeded targets by 8%. Strongest quarter on record with SAR 773K in revenue.",
  },
  {
    id: 5,
    title: "Website Traffic Analysis",
    category: "Marketing",
    date: "2026-02-15",
    summary:
      "Organic traffic up 23%. Average session duration increased from 2:30 to 3:45 after redesign.",
  },
  {
    id: 6,
    title: "Customer Satisfaction Survey",
    category: "Customer Service",
    date: "2026-02-10",
    summary:
      "NPS score improved from 42 to 58. Main complaints: delivery speed and packaging quality.",
  },
];

// --- Team Members (for Team page) ---
export const teamMembers = [
  {
    name: "Ahmed Al-Rashid",
    role: "CEO & Founder",
    department: "Executive",
    avatar: "AR",
  },
  {
    name: "Fatima Hassan",
    role: "Head of Marketing",
    department: "Marketing",
    avatar: "FH",
  },
  {
    name: "Mohammed Tariq",
    role: "Lead Developer",
    department: "Engineering",
    avatar: "MT",
  },
  {
    name: "Sara Al-Dosari",
    role: "Operations Manager",
    department: "Operations",
    avatar: "SD",
  },
  {
    name: "Khalid Ibrahim",
    role: "Sales Director",
    department: "Sales",
    avatar: "KI",
  },
  {
    name: "Noura Al-Qahtani",
    role: "Finance Lead",
    department: "Finance",
    avatar: "NQ",
  },
];

// --- Notifications / Activity Feed ---
export const recentActivity = [
  {
    action: "New order received",
    detail: "ORD-2847 from Ahmed Al-Rashid",
    time: "5 minutes ago",
  },
  {
    action: "Report generated",
    detail: "Monthly Revenue Analysis",
    time: "2 hours ago",
  },
  {
    action: "Low stock alert",
    detail: "Smart Home Kit — only 3 remaining",
    time: "4 hours ago",
  },
  {
    action: "New customer signup",
    detail: "Lina Al-Harbi joined",
    time: "6 hours ago",
  },
  {
    action: "Payment received",
    detail: "SAR 3,400 from Mohammed Al-Saud",
    time: "Yesterday",
  },
];
