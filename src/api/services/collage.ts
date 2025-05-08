// internal import
import apiClient from "../client";
import { CollageAPIs, HttpMethod } from "../endpoints";

export async function getCollageById(id: string, params: any = {}) {
  const { method, url } = CollageAPIs.get_by_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function updateCollage(
  id: string,
  body: any = {},
  params: any = {}
) {
  const { method, url } = CollageAPIs.get_by_id;
  const response = await apiClient[method as HttpMethod](
    url(id),
    { ...body },
    { params }
  );
  return response.data;
}
