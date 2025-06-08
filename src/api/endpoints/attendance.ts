export const AttendanceAPIs = {
  create_attendances: {
    url: "/attendances",
    method: "post",
  },
  get_attendance_count_by_student_id: {
    url: (id: string) => `/attendances//students/${id}`,
    method: "get",
  },
};
