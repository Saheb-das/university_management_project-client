export const ResultAPIs = {
  get_result_by_student_exam_sem: {
    url: (studentId: string, examId: string) =>
      `/results/students/${studentId}/exam/${examId}`,
    method: "get",
  },
  create_result: {
    url: "/results",
    method: "post",
  },
  get_result_by_sem_batch_student: {
    url: (id: string) => `/results/sems/${id}`,
    method: "get",
  },
};
