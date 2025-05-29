export const AdmissionAPIs = {
  create_admission: {
    url: "/admissions",
    method: "post",
  },
  create_batch: {
    url: "/batches",
    method: "post",
  },
  get_all_batches: {
    url: "/batches",
    method: "get",
  },
  get_all_admissions: {
    url: "/admissions",
    method: "get",
  },
  get_top_three: {
    url: "/admissions/top-three",
    method: "get",
  },
  get_total_admits_coms: {
    url: (id: string) => `/admissions/${id}/admits-coms`,
    method: "get",
  },
  get_prev_years_stats: {
    url: (id: string) => `/admissions/${id}/stats`,
    method: "get",
  },
};
