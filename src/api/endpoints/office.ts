export const OfficeAPIs = {
  create_form: {
    url: "/forms",
    method: "post",
  },
  get_form_titles: {
    url: "/forms/form-titles",
    method: "get",
  },
  get_identity_forms: {
    url: "/forms/identity",
    method: "get",
  },
  submit_student_form: {
    url: "/forms/submit/student",
    method: "post",
  },
  submit_other_form: {
    url: "/forms/submit/other",
    method: "post",
  },
  get_submitted_form_data: {
    url: "/forms/submit/data",
    method: "get",
  },
};
