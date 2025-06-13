import { ITransaction } from "@/features/transactions/types/transaction";

interface IApiRes {
  success: boolean;
  message: string;
}

export interface ICourse {
  id: string;
  name: string;
  duration: number;
  courseFees: string;
  numberOfSem: number;
  degreeId: string;
  createdAt: string;
  updatedAt: string;
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

export interface IFeeTransaction extends ITutionFee {
  transaction: ITransaction;
}

export interface IFeeVerifyBody {
  tranId: string;
}

export interface ICourseRes extends IApiRes {
  course: ICourse;
}

export interface IFeeTransByStudentRes extends IApiRes {
  transaction: IFeeTransaction;
}

export interface IVerifyFeeRes extends IApiRes {
  verified: ITutionFee;
}
