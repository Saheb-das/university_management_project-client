// internal import
import apiClient from "../client";
import { AuthAPIs, HttpMethod } from "../endpoints";

// types import
import { ILoginClient, IRegisterClient } from "@/types/auth";

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

export async function forgotPassword(forgotPassData: any) {
  const { method, url } = AuthAPIs.forgot_password;
  const response = await apiClient[method as HttpMethod](url, forgotPassData);
  return response;
}

export async function verifyOTP(verifyInfo: any) {
  const { method, url } = AuthAPIs.verify_otp;
  const response = await apiClient[method as HttpMethod](url, verifyInfo);
  return response;
}

export async function resetPassword(resetInfo: any) {
  const { method, url } = AuthAPIs.reset_password;
  const response = await apiClient[method as HttpMethod](url, resetInfo);
  return response;
}
