// external import
import { z } from "zod";

export const stuffSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum([
    "superadmin",
    "admin",
    "counsellor",
    "examceller",
    "accountant",
    "teacher",
  ]),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phoneNo: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  aadharNo: z.string().regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
  highestDegree: z.string().min(2, "Highest degree is required"),
  specialization: z.string().min(2, "Specialization is required"),
  bankName: z.string().min(2, "Bank name is required"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  accountNo: z
    .string()
    .min(9)
    .max(18, "Account number must be between 9 and 18 digits"),
});

export type TStuffClient = z.infer<typeof stuffSchema>;

export const studentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  department: z.string().min(2, "Department is required"),
  course: z.string().min(2, "Course is required"),
  degree: z.string().min(2, "Degree is required"),
  admissionYear: z.string().min(4, "Year should be yyyy format"),
});

export type TStudentClient = z.infer<typeof studentSchema>;
