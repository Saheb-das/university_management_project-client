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
  address: z.string().min(10, "Address must be at least 10 characters"),
  phoneNo: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  adhaarNo: z.string().regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
  highestDegree: z.string().min(2, "Highest degree is required"),
  specializedIn: z.string().min(2, "Specialization is required"),
  bankName: z.string().min(2, "Bank name is required"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  accountNo: z
    .string()
    .min(9)
    .max(18, "Account number must be between 9 and 18 digits"),
  accountHolderName: z.string().min(2, "Specialization is required"),
});

export type TStuffClient = z.infer<typeof stuffSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords must match",
  });
