export const StudentAPIs = {
  get_students_by_dept_deg_year: {
    url: "/students",
    method: "get",
  },
  update_status: {
    url: (id: string) => `/students/${id}/status`,
    method: "patch",
  },
};
