export const DepartmentAPIs = {
  create_dept: {
    url: "/collages/departments",
    method: "post",
  },
  get_deprts: {
    url: "/collages/departments",
    method: "get",
  },
  create_course: {
    url: "/courses",
    method: "post",
  },
  get_courses_by_degId: {
    url: "/courses",
    method: "get",
  },
  create_subjects: {
    url: "/subjects",
    method: "post",
  },
  get_subjects_by_courseId: {
    url: "/courses/subjects",
    method: "get",
  },
};
