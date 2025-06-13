export const TutionFeeAPIs = {
  get_course_by_id: {
    url: (id: string) => `/courses/${id}`,
    method: "get",
  },
  get_tution_fee_tran_by_student_id: {
    url: (id: string) => `/transactions/students/${id}`,
    method: "get",
  },
  verify_tution_fee_by_id: {
    url: (id: string) => `/transactions/fees/${id}/verify-fee`,
    method: "patch",
  },
};
