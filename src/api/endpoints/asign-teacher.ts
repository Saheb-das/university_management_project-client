export const AsignTeacherAPIs = {
  get_asign_teacher_users: {
    url: "/users/teachers",
    method: "get",
  },
  asign_teacher: {
    url: (id: string) => `/asign-teachers/${id}`,
    method: "post",
  },
  remove_asigned_subject: {
    url: (id: string) => `/asign-teachers/${id}`,
    method: "delete",
  },
  get_all_asigned_subjects_by_teacher_id: {
    url: (id: string) => `/asign-teachers/${id}/subjects`,
    method: "get",
  },
  get_all_batches_by_teacher_user_id: {
    url: "/asign-teachers/batches",
    method: "get",
  },
  get_asigned_teachers_by_batch_sem_ids: {
    url: (batchId: string, semId: string) =>
      `/asign-teachers/batches/${batchId}/sems/${semId}`,
    method: "get",
  },
};
