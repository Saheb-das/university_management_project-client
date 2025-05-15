export const UserAPIs = {
  create_stuff: {
    url: "/users",
    method: "post",
  },
  get_users_by_role: {
    url: "/users",
    method: "get",
  },
  get_user_by_id: {
    url: (id: string) => `/users/${id}`,
    method: "get",
  },
  update_status: {
    url: (id: string) => `/users/${id}/status`,
    method: "patch",
  },
};
