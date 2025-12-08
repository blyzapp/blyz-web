// ============================================================================
// 🌨️ Blyz Admin Mock Data — Jobs / Operators / Payout Weeks
// FINAL 2025 BUILD — CLEAN + MATCHES UI EXACTLY
// ============================================================================

// -----------------------------
// Mock Jobs
// -----------------------------
export const MOCK_JOBS = [
  {
    id: "JOB-1024",
    customerName: "Sarah Johnson",
    operatorName: "Alex Martin",
    status: "pending",
    price: 59.99,
    createdAt: "2025-11-19 08:42",
    scheduledAt: "2025-11-19 09:15",
    address: "123 Queen St E, Toronto",
  },
  {
    id: "JOB-1025",
    customerName: "Mike Chen",
    operatorName: "Alex Martin",
    status: "accepted",
    price: 74.5,
    createdAt: "2025-11-19 09:01",
    scheduledAt: "2025-11-19 09:20",
    address: "88 Bloor St W, Toronto",
  },
  {
    id: "JOB-1026",
    customerName: "Ritestart Office",
    operatorName: "Snow King Inc.",
    status: "in_progress",
    price: 129.0,
    createdAt: "2025-11-18 22:17",
    scheduledAt: "2025-11-18 22:25",
    address: "410 Front St W, Toronto",
  },
  {
    id: "JOB-1019",
    customerName: "Linda Park",
    operatorName: "Pat’s Plows",
    status: "completed",
    price: 49.99,
    createdAt: "2025-11-18 06:34",
    scheduledAt: "2025-11-18 06:50",
    address: "22 Dundas Sq, Toronto",
  },
  {
    id: "JOB-1015",
    customerName: "Condo Corp 2204",
    operatorName: "",
    status: "cancelled",
    price: 0,
    createdAt: "2025-11-17 19:12",
    scheduledAt: "2025-11-17 19:30",
    address: "77 King St W, Toronto",
  },
];

// -----------------------------
// Mock Operators
// -----------------------------
export const MOCK_OPERATORS = [
  {
    id: "OP-1",
    name: "Alex Martin",
    email: "alex@blyz-ops.com",
    rating: 4.9,
    jobsCompleted: 142,
    status: "online",
    phone: "647-123-4567",
    joinedAt: "2024-12-12",
  },
  {
    id: "OP-2",
    name: "Snow King Inc.",
    email: "dispatch@snowking.ca",
    rating: 4.7,
    jobsCompleted: 89,
    status: "online",
    phone: "416-222-8899",
    joinedAt: "2024-10-01",
  },
  {
    id: "OP-3",
    name: "Pat’s Plows",
    email: "pat@plows.ca",
    rating: 4.5,
    jobsCompleted: 34,
    status: "offline",
    phone: "437-445-2211",
    joinedAt: "2025-01-05",
  },
  {
    id: "OP-4",
    name: "New Operator",
    email: "newop@example.com",
    rating: 0,
    jobsCompleted: 0,
    status: "pending_approval",
    phone: "",
    joinedAt: "2025-02-01",
  },
];

// -----------------------------
// Mock Payout Weeks
// MATCHES payouts/page.tsx UI EXACTLY
// -----------------------------
export const MOCK_PAYOUT_WEEKS = [
  {
    weekKey: "2025-W47",
    label: "Week of Nov 17",
    startDate: "2025-11-17",
    endDate: "2025-11-23",
    jobsCount: 12,
    operatorsCount: 3,
    totalAmount: 1345.5,
    pendingAmount: 210.0,
    status: "draft",
    generatedAt: "2025-11-23 22:10",

    operatorBreakdown: [
      {
        operatorId: "OP-1",
        operatorName: "Alex Martin",
        jobsCount: 5,
        amount: 600,
        status: "draft",
      },
      {
        operatorId: "OP-2",
        operatorName: "Snow King Inc.",
        jobsCount: 4,
        amount: 450,
        status: "draft",
      },
      {
        operatorId: "OP-3",
        operatorName: "Pat’s Plows",
        jobsCount: 3,
        amount: 295.5,
        status: "draft",
      },
    ],
  },

  {
    weekKey: "2025-W46",
    label: "Week of Nov 10",
    startDate: "2025-11-10",
    endDate: "2025-11-16",
    jobsCount: 10,
    operatorsCount: 3,
    totalAmount: 1200.0,
    pendingAmount: 0,
    status: "paid",
    generatedAt: "2025-11-17 21:34",

    operatorBreakdown: [
      {
        operatorId: "OP-1",
        operatorName: "Alex Martin",
        jobsCount: 4,
        amount: 480,
        status: "paid",
      },
      {
        operatorId: "OP-2",
        operatorName: "Snow King Inc.",
        jobsCount: 3,
        amount: 360,
        status: "paid",
      },
      {
        operatorId: "OP-3",
        operatorName: "Pat’s Plows",
        jobsCount: 3,
        amount: 360,
        status: "paid",
      },
    ],
  },
];
