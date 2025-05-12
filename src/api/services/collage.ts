// internal import
import apiClient from "../client";
import { CollageAPIs, HttpMethod } from "../endpoints";

// types import
import { ICollageRes } from "@/features/collage/types/collage";

export async function getCollageById(
  id: string,
  params: any = {}
): Promise<ICollageRes | null> {
  const { method, url } = CollageAPIs.get_by_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}

export async function updateCollage(
  id: string,
  body: any = {},
  params: any = {}
): Promise<ICollageRes | null> {
  const { method, url } = CollageAPIs.update_collage_by_id;
  const response = await apiClient[method as HttpMethod](
    url(id),
    { ...body },
    { params }
  );
  return response.data;
}
