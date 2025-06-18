interface IApiRes {
  success: boolean;
  message: string;
}

type TTransMode = "online" | "banking" | "cash" | "in_app";
type TTransType = "salary" | "tutionFee";

export type TTransRes = {
  id: string;
  type: TTransType;
  userRole: string;
  amount: string;
  currency: string;
  date: string;
  time: string;
  mode: TTransMode;
  utr: string;
  createdAt: string;
  updatedAt: string;
};

type BankAccount = {
  id: string;
  accountNo: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

export interface TTranRes extends TTransRes {
  salary?: Salary;
  tutionFee?: TutionFee;
}

export interface IDetailedTran extends TTransRes {
  salary?: Salary;
  tutionFee?: TutionFee;
}

export interface IDetailedTranRes extends IApiRes {
  transaction: IDetailedTran;
}

export type Salary = {
  id: string;
  inMonth: string;
  salaryAmount: string;
  performanceBonus: string;
  totalAmount: string;
  senderId: string;
  recieverId: string;
  transactionId: string;
  reciever: {
    id: string;
    bankAccount: BankAccount;
  };
  sender: {
    id: string;
    bankAccount: BankAccount;
  };
  createdAt: string;
  updatedAt: string;
};

export type TutionFee = {
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
};
