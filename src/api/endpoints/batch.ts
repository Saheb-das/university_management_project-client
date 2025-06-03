export const BatchAPIs = {
  get_batches: {
    url: "/batches",
    method: "get",
  },
  get_semesters_by_batch_id: {
    url: (id: string) => `/batches/${id}/semesters`,
    method: "get",
  },
  get_batches_by_dept_deg: {
    url: "/batches/dept-deg",
    method: "get",
  },
};
