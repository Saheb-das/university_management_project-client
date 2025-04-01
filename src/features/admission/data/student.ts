export const studentFields = [
  { name: "firstName", type: "text", placeholder: "First Name" },
  { name: "lastName", type: "text", placeholder: "Last Name" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "phone", type: "tel", placeholder: "Phone" },
  { name: "department", type: "text", placeholder: "Department" },
  { name: "course", type: "text", placeholder: "Course" },
  { name: "degree", type: "text", placeholder: "Degree" },
  {
    name: "admissionYear",
    type: "text",
    placeholder: "Admission Year",
  },
] as const;
