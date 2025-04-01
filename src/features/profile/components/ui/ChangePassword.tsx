// external import
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// internal import
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// types import
import { IPassword } from "../../pages/Profile";

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
    path: ["confirmNewPassword"], // Error message applied to confirmNewPassword field
    message: "Passwords must match",
  });

// Infer TypeScript types
type FormValues = z.infer<typeof schema>;

export interface IChangedPassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordProps {
  onChangePassword: (passwordInfo: IPassword) => void;
}

const ChangePassword = ({ onChangePassword }: ChangePasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangedPassword>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const changedPassObj = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    onChangePassword(changedPassObj);
  };
  return (
    <Card className="mt-4">
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 ">
            <Label className="text-base mb-2" htmlFor="oldPassword">
              Old Password
            </Label>
            <Input
              type="password"
              id="oldPassword"
              {...register("oldPassword")}
              className={cn(errors.oldPassword && "border-red-500")}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label className="text-base mb-2" htmlFor="newPassword">
              New Password
            </Label>
            <Input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              className={cn(errors.newPassword && "border-red-500")}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label className="text-base mb-2" htmlFor="confirmNewPassword">
              Confirm New Password
            </Label>
            <Input
              type="password"
              id="confirmNewPassword"
              {...register("confirmNewPassword")}
              className={cn(errors.confirmNewPassword && "border-red-500")}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// export
export default ChangePassword;
