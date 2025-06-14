export const TransAPIs = {
  all_my_trans: {
    url: "/transactions/me",
    method: "get",
  },
  trans_by_id: {
    url: (id: string) => `/transactions/${id}`,
    method: "get",
  },
  create_new_trans: {
    url: "/transactions",
    method: "post",
  },
  get_all_trans: {
    url: "/transactions",
    method: "get",
  },
};
