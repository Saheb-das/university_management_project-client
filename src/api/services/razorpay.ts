// internal import
import apiClient from "../client";
import { HttpMethod, RazorpayAPIs } from "../endpoints";

// types import
import {
  ICreatePayOrderRes,
  RazorpayPaymentResponse,
  IVerifyPayOrderRes,
} from "@/types/razorpay";

export async function createPayOrder(body: {
  amount: string;
}): Promise<ICreatePayOrderRes | null> {
  const { method, url } = RazorpayAPIs.create_order;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}

// TODO:
export async function verifyPayOrder(
  body: RazorpayPaymentResponse
): Promise<IVerifyPayOrderRes | null> {
  const { method, url } = RazorpayAPIs.verify_order;
  const response = await apiClient[method as HttpMethod](url, body);
  return response.data;
}
