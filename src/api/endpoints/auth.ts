export const AuthAPIs = {
  register: {
    url: "/auth/register",
    method: "post",
  },
  login: {
    url: "/auth/login",
    method: "post",
  },
  forgot_password: {
    url: "/auth/forgot-password",
    method: "post",
  },
  verify_otp: {
    url: "/auth/verify-otp",
    method: "post",
  },
  reset_password: {
    url: "/auth/reset-password",
    method: "post",
  },
  get_all_collages: {
    url: "/auth/collages",
    method: "get",
  },
};
