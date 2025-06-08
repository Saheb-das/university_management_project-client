export const StudentAPIs = {
  get_students_by_dept_deg_year: {
    url: "/students",
    method: "get",
  },
  update_status: {
    url: (id: string) => `/students/${id}/status`,
    method: "patch",
  },
  get_students_by_batch_id: {
    url: "/students/batch",
    method: "get",
  },
  update_roll_reg_by_student_id: {
    url: (id: string) => `/students/${id}/set-identifier`,
    method: "patch",
  },
  get_student_user_by_user_id: {
    url: (id: string) => `/students/user/${id}`,
    method: "get",
  },
};
