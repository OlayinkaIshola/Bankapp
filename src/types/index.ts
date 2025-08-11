// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceInfo {
  id: string;
  name: string;
  lastActiveAt: string;
}

export interface LoginActivity {
  id: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  status: 'success' | 'failed';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // 2FA and session
  requires2FA?: boolean;
  is2FAVerified?: boolean;
  sessionExpiresAt?: string | null;
  twoFactorEnabled?: boolean;
  devices?: DeviceInfo[];
  loginActivities?: LoginActivity[];
}

export interface NotificationPreferences {
  txEmail: boolean;
  txSMS: boolean;
  txPush: boolean;
  billRemindersEmail: boolean;
  marketingEmail: boolean;
}

// Account Types
export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'savings' | 'checking' | 'credit' | 'loan';
  balance: number;
  availableBalance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen';
  createdAt: string;
  updatedAt: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  accountId: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  category: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  balance: number;
}

// Transfer Types
export interface Transfer {
  id?: string;
  fromAccountId: string;
  toAccountId?: string;
  toAccountNumber?: string;
  amount: number;
  description: string;
  transferType: 'internal' | 'external' | 'international';
  status: 'pending' | 'completed' | 'failed';
  scheduledDate?: string;
  createdAt?: string;
}

// Card Types
export interface Card {
  id: string;
  accountId: string;
  cardNumber: string;
  cardType: 'debit' | 'credit';
  expiryDate: string;
  status: 'active' | 'blocked' | 'expired';
  dailyLimit: number;
  monthlyLimit: number;
  createdAt: string;
}

// Bill Payment Types
export interface Bill {
  id: string;
  payeeName: string;
  accountNumber: string;
  amount: number;
  dueDate: string;
  category: 'utilities' | 'insurance' | 'loan' | 'subscription' | 'other';
  status: 'pending' | 'paid' | 'overdue';
  isRecurring: boolean;
  frequency?: 'monthly' | 'quarterly' | 'yearly';
}

// Loan Types
export interface Loan {
  id: string;
  loanType: 'personal' | 'home' | 'auto' | 'business';
  principalAmount: number;
  outstandingBalance: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  nextPaymentDate: string;
  status: 'active' | 'paid' | 'defaulted';
  createdAt: string;
}

// Investment Types
export interface Investment {
  id: string;
  investmentType: 'mutual_fund' | 'fixed_deposit' | 'stocks' | 'bonds';
  name: string;
  amount: number;
  currentValue: number;
  returns: number;
  maturityDate?: string;
  status: 'active' | 'matured' | 'closed';
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  terms?: boolean;
}

export interface TransferForm {
  fromAccountId: string;
  toAccountNumber: string;
  amount: number;
  description: string;
  transferType: 'internal' | 'external' | 'international';
  scheduledDate?: string;
}

export interface BillPaymentForm {
  payeeName: string;
  accountNumber: string;
  amount: number;
  fromAccountId: string;
  description: string;
  scheduledDate?: string;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
  children?: NavItem[];
}

// Dashboard Types
export interface DashboardData {
  accounts: Account[];
  recentTransactions: Transaction[];
  totalBalance: number;
  monthlySpending: number;
  notifications: Notification[];
  upcomingBills: Bill[];
}
