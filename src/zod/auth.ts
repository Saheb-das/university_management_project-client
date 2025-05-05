// external import
import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
  );

export const phoneNoValidation = z
  .string()
  .length(10, "Phone number must be exactly 10 digits")
  .regex(/^\d{10}$/, "Phone number must only contain digits");

export const registerSchema = z.object({
  firstName: z.string().min(3, "atlast 3 char"),
  lastName: z.string().min(2, "atleast 2 char"),
  email: z.string().email(),
  password: passwordValidation,
  role: z.enum(["superadmin"]),
  address: z.string().min(10, "atleast 10 char"),
  phoneNo: phoneNoValidation,
  adhaarNo: z.string(),
  highestDegree: z.string(),
  specialization: z.string(),
  accountNo: z.string(),
  ifscCode: z.string(),
  bankName: z.string(),
  accountHolderName: z.string(),
  collageName: z.string().min(10, "atleast 10 char"),
  collageAddress: z.string().min(10, "atleast 10 char"),
  collageRegNo: z.string().min(6, "6 char required"),
  collageEstablishedYear: z.string().min(4, "year required. ( yyyy )"),
  collageAccountNo: z.string(),
  collageIfscCode: z.string(),
  collageBankName: z.string(),
  collageAccountHolderName: z.string(),
});

export const RoleEnum = z.enum([
  "superadmin",
  "admin",
  "counsellor",
  "examceller",
  "accountant",
  "teacher",
  "student",
]);

export type TRole = z.infer<typeof RoleEnum>;

export const loginSchema = z.object({
  role: RoleEnum,
  email: z.string().email(),
  password: passwordValidation,
});
