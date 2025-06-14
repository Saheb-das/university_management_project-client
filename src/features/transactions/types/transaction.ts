interface IApiRes {
  success: boolean;
  message: string;
}

interface ITransClient {
  type: "salary" | "tutionFee";
  userRole: string;
  amount: string;
  date: string;
  time: string;
  mode: "cash" | "banking" | "online" | "inapp";
  utr: string;
}

interface IRazorOderClient {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface ISalaryClient {
  inMonth: string;
  performanceBonus: string;
  salaryAmount: string;
  totalAmount: string;
}

interface ITutionFeeClient {
  semNo: number;
  semFees: string;
  lateFine: string;
  totalAmount: string;
}

interface ITransFullClient {
  trans: ITransClient;
  razor: IRazorOderClient;
  salary?: ISalaryClient;
  tutionFee?: ITutionFeeClient;
}

export interface ICreateTransBody {
  transData: ITransFullClient;
  isSalary: boolean;
  userId: string;
}

export interface ITransaction {
  id: string;
  type: "salary" | "tutionFee";
  userRole: string;
  amount: string;
  currency: string;
  date: string;
  time: string;
  mode: "cash" | "banking" | "online" | "inapp";
  utr: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTransRes extends IApiRes {
  transaction: ITransaction;
}

interface ITutionFee {
  id: string;
  semNo: number;
  semFees: string;
  lateFine: string;
  totalAmount: string;
  isVerified: boolean;

  senderId: string;
  recieverId: string;
  transactionId: string;

  createdAt: string;
  updatedAt: string;
}

interface ISalary {
  id: string;
  inMonth: string;
  salaryAmount: string;
  performanceBonus: string;
  totalAmount: string;

  senderId: string;
  recieverId: string;
  transactionId: string;

  createdAt: string;
  updatedAt: string;
}

export interface TransWithSalaryOrFee extends ITransaction {
  salary?: ISalary;
  tutionFee?: ITutionFee;
}

export interface ITransactionsRes extends IApiRes {
  transactions: ITransaction[];
}

export interface IMyTransactionsRes extends IApiRes {
  transactions: TransWithSalaryOrFee[];
}
