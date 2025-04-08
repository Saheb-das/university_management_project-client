// external import
import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
  );

const phoneNoValidation = z
  .string()
  .length(10, "Phone number must be exactly 10 digits")
  .regex(/^\d{10}$/, "Phone number must only contain digits");

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
  phone: phoneNoValidation,
  password: passwordValidation,
  role: z.enum(["student"]),
  address: z.string().min(10, "atleast 10 char"),
  adhaarNo: z.string().min(12, "12 char required"),
  dob: z.string().min(8, "dd-mm-yyyy formate required"),
  guardianName: z.string().min(4, "atleast 4 char"),
  relWithGuardian: z.string().min(3, "atleast 3 char"),
  gradeAtHigherSec: z.string().min(2, "atleast 2 char"),
  gradeAtSec: z.string().min(2, "atleast 2 char"),
  admissionYear: z.string().min(4, "atleast 4 char required"),
  batch: z.string(),
});

export type TStudentClient = z.infer<typeof studentSchema>;
