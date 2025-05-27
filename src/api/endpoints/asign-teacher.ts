export const AsignTeacherAPIs = {
  get_asign_teacher_users: {
    url: "/users/teachers",
    method: "get",
  },
  asign_teacher: {
    url: (id: string) => `/asign-teachers/${id}/subjects`,
    method: "post",
  },
  remove_teacher: {
    url: (id: string) => `/asign-teachers/${id}`,
    method: "delete",
  },
};
