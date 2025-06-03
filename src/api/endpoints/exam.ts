export const ExamAPIs = {
  create_exam: {
    url: "/exams",
    method: "post",
  },
  get_exams_by_course_id: {
    url: (id: string) => `/exams/courses/${id}`,
    method: "get",
  },
};
