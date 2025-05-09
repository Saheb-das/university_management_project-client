// external imports
import { useState } from "react";

// internal imports
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { changePasswordSchema } from "@/zod/user";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import { useParams } from "react-router";
import { TChangePasswordInfo } from "../../types/profile";
import { toast } from "sonner";

// types

// Zod schema

export interface IChangedPassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const params = useParams<{ userRole: string; userId: string }>();
  const [formData, setFormData] = useState<IChangedPassword>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const userId = params.userId;
  if (!userId) {
    return;
  }

  const [errors, setErrors] = useState<
    Partial<Record<keyof IChangedPassword, string>>
  >({});

  const { mutate, isPending } = useUpdatePassword(userId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = changePasswordSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof IChangedPassword, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof IChangedPassword;
        newErrors[field] = issue.message;
      }
      setErrors(newErrors);
      return;
    }

    const info: TChangePasswordInfo = {
      oldPass: result.data.oldPassword,
      newPass: result.data.newPassword,
      confirmNewPass: result.data.confirmNewPassword,
    };

    mutate(info, {
      onSuccess: (data) => {
        if (data?.changedPassword) {
          toast.success("password updated successfully");
        }
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setErrors({});
      },
      onError: () => {
        toast.error("password update failed");
      },
    });
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

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Submiting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
