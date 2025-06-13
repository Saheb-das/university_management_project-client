// internal import
import { IFeeTransByStudentRes } from "@/features/tution-fees/types/tutionFee";
import apiClient from "../client";
import { HttpMethod, TransAPIs } from "../endpoints";

// types import
import {
  ICreateTransBody,
  IMyTransactionsRes,
} from "@/features/transactions/types/transaction";
import { TTranRes } from "@/types/transaction";

export async function getMyAllTrans(): Promise<IMyTransactionsRes | null> {
  const { method, url } = TransAPIs.all_my_trans;
  const response = await apiClient[method as HttpMethod](url);
  return response.data;
}

export async function getTransById(
  id: string,
  params: any = {}
): Promise<TTranRes | null> {
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
