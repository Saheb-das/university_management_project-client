// internal import
import apiClient from "../client";
import { HttpMethod, TransAPIs } from "../endpoints";

// types import
import {
  ICreateTransBody,
  IMyTransactionsRes,
  ITransactionRes,
  ITransactionsRes,
} from "@/features/transactions/types/transaction";
import { IDetailedTranRes, TTranRes } from "@/types/transaction";

export async function getMyAllTrans(): Promise<IMyTransactionsRes | null> {
  const { method, url } = TransAPIs.all_my_trans;
  const response = await apiClient[method as HttpMethod](url);
  return response.data;
}

export async function getTransById(
  id: string,
  params: { payType: "salary" | "tutionFee" }
): Promise<IDetailedTranRes | null> {
  const { method, url } = TransAPIs.trans_by_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function createNewTrans(
  body: ICreateTransBody
): Promise<TTranRes | null> {
  const { method, url } = TransAPIs.create_new_trans;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}

export async function getAllTrans(params: {
  fromDate?: string;
  type?: "salary" | "tutionFee";
}): Promise<ITransactionsRes | null> {
  const { method, url } = TransAPIs.get_all_trans;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getPrevMonthTransactionByStuffUserId(
  id: string
): Promise<ITransactionRes | null> {
  const { method, url } = TransAPIs.get_prev_month_tran_by_stuff_user_id;
  const response = await apiClient[method as HttpMethod](url(id));
  return response.data;
}
