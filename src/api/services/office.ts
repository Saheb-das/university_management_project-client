// internal import
import apiClient from "../client";
import { HttpMethod, OfficeAPIs } from "../endpoints";

// types import
import {
  ICreateFormRes,
  IFormBody,
  IFormBodyQuery,
  IFormTitlesRes,
  IIdentiryFormsRes,
  ISubmitOtherProps,
  ISubmitStudentProps,
  ISubmittedFormDataRes,
} from "@/features/office/types/office";

export async function createForm(
  body: IFormBody,
  params: IFormBodyQuery
): Promise<ICreateFormRes | null> {
  const { method, url } = OfficeAPIs.create_form;
  const response = await apiClient[method as HttpMethod](url, body, { params });
  return response.data;
}

export async function getFormTitles(): Promise<IFormTitlesRes | null> {
  const { method, url } = OfficeAPIs.get_form_titles;
  const response = await apiClient[method as HttpMethod](url);
  return response.data;
}

export async function getIdentityForms(params: {
  identity: string;
}): Promise<IIdentiryFormsRes | null> {
  const { method, url } = OfficeAPIs.get_identity_forms;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function getSubmittedFormData(params: {
  formKey: string;
}): Promise<ISubmittedFormDataRes | null> {
  const { method, url } = OfficeAPIs.get_submitted_form_data;
  const response = await apiClient[method as HttpMethod](url, { params });
  return response.data;
}

export async function submitStudentForm(
  body: ISubmitStudentProps
): Promise<boolean | null> {
  const { method, url } = OfficeAPIs.submit_student_form;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}

export async function submitOtherForm(
  body: ISubmitOtherProps
): Promise<boolean | null> {
  const { method, url } = OfficeAPIs.submit_other_form;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}
