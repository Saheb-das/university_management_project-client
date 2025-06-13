export const TutionFeeAPIs = {
  get_course_by_id: {
    url: (id: string) => `/courses/${id}`,
    method: "get",
  },
  create_pay_order: {
    url: "/transactions//create-order",
    method: "post",
  },
  verify_pay_order: {
    url: "/transactions/verify-order",
    method: "post",
  },
};
