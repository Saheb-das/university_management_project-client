// internal import
import apiClient from "../client";
import { AuthAPIs, HttpMethod } from "../endpoints";

// types import
import {
  CommonBody,
  ICollagesRes,
  ILoginClient,
  IRegisterClient,
  ResetBody,
  VerifyBody,
} from "@/types/auth";

export async function register(registerData: IRegisterClient) {
  const { method, url } = AuthAPIs.register;
  const response = await apiClient[method as HttpMethod](url, registerData);
  return response.data;
}

export async function login(loginData: ILoginClient) {
  const { method, url } = AuthAPIs.login;
  const response = await apiClient[method as HttpMethod](url, loginData);
  return response.data;
}

export async function forgotPassword(forgotPassData: CommonBody) {
  const { method, url } = AuthAPIs.forgot_password;
  const response = await apiClient[method as HttpMethod](url, forgotPassData);
  return response.data;
}

export async function verifyOTP(verifyInfo: VerifyBody) {
  const { method, url } = AuthAPIs.verify_otp;
  const response = await apiClient[method as HttpMethod](url, verifyInfo);
  return response.data;
}

export async function resetPassword(resetInfo: ResetBody) {
  const { method, url } = AuthAPIs.reset_password;
  const response = await apiClient[method as HttpMethod](url, resetInfo);
  return response.data;
}

export async function getAllCollages(): Promise<ICollagesRes | null> {
  const { method, url } = AuthAPIs.get_all_collages;
  const response = await apiClient[method as HttpMethod](url);
  return response.data;
}
