// internal import
import apiClient from "../client";
import { HttpMethod, TransAPIs } from "../endpoints";

// types import
import { TTranRes, TTransRes } from "@/types/transaction";

export async function getAllTrans(
  params: any = {}
): Promise<TTransRes[] | null> {
  const { method, url } = TransAPIs.all_my_trans;
  const response = await apiClient[method as HttpMethod](url, { params });
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
