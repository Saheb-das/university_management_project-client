// external imports
import { z } from "zod";
import { useState } from "react";

// internal imports
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// types

// Zod schema
const schema = z
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

export interface IChangedPassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const [formData, setFormData] = useState<IChangedPassword>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof IChangedPassword, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof IChangedPassword, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof IChangedPassword;
        newErrors[field] = issue.message;
      }
      setErrors(newErrors);
      return;
    }

    // Optionally reset the form
    setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    setErrors({});
  };

  return (
    <Card className="mt-4">
      <CardHeader />
      <CardContent>
        <form onSubmit={handleSubmit}>
          {["oldPassword", "newPassword", "confirmNewPassword"].map((field) => (
            <div key={field} className="mb-4">
              <Label htmlFor={field} className="text-base mb-2 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </Label>
              <Input
                id={field}
                name={field}
                type="password"
                value={formData[field as keyof IChangedPassword]}
                onChange={handleChange}
                className={cn(
                  errors[field as keyof IChangedPassword] && "border-red-500"
                )}
              />
              {errors[field as keyof IChangedPassword] && (
                <p className="text-red-500 text-sm">
                  {errors[field as keyof IChangedPassword]}
                </p>
              )}
            </div>
          ))}

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
