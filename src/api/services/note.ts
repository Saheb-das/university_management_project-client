// internal import
import apiClient from "../client";
import { HttpMethod, StudyRoomAPIs } from "../endpoints";

// types import
import {
  ICreateNoteRes,
  INewMaterialBody,
  INotesByBatchIdRes,
} from "@/features/studyroom/types/studyRoom";

export async function createNewMaterial(
  body: INewMaterialBody
): Promise<ICreateNoteRes | null> {
  const { method, url } = StudyRoomAPIs.create_new_material;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}

export async function getNotesByBatchId(
  id: string,
  params: any = {}
): Promise<INotesByBatchIdRes | null> {
  const { method, url } = StudyRoomAPIs.get_all_notes_by_batch_id;
  const response = await apiClient[method as HttpMethod](url(id), { params });
  return response.data;
}
