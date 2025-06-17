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
  get_prev_month_tran_by_stuff_user_id: {
    url: (userId: string) => `/transactions/stuff/${userId}`,
    method: "get",
  },
};
