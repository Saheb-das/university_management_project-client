// external import
import { useState } from "react";
import { Loader2, Mail, Shield, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router";

// internal import
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollages } from "../hooks/useCollages";
import { useForgetPassword } from "../hooks/useForgetPassword";
import { toast } from "sonner";
import { useVerifyOTP } from "../hooks/useVerifyOTP";
import { useResetPassword } from "../hooks/useResetPassword";
import { isAxiosError } from "axios";
import { passwordValidation } from "@/zod/auth";

type Step = "initial" | "otp" | "newPassword";

const roles = [
  "superadmin",
  "admin",
  "accountant",
  "examceller",
  "counsellor",
  "teacher",
  "student",
];

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("initial");
  const [formData, setFormData] = useState({
    college: "",
    role: "",
    email: "",
    otp: "",
    newPassword: "",
  });

  const { data: collageData, isSuccess: isCollageSuccess } = useCollages();
  const { mutate: forgetPassMutate, isPending: isForgetPending } =
    useForgetPassword();
  const { mutate: verifyMutate, isPending: isVerifyPending } = useVerifyOTP();
  const { mutate: resetMutate, isPending: isResetPending } = useResetPassword();

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.college || !formData.role || !formData.email) return;

    forgetPassMutate(
      {
        role: formData.role,
        email: formData.email,
        collageId: formData.college,
      },
      {
        onSuccess: (res) => {
          if (!res) return res;

          if (res.success) {
            toast.success(res.message || "initial step completed");
            setCurrentStep("otp");
          }
        },
        onError: (err) => {
          toast.error(err.message || "initial step failed");
        },
      }
    );
  };

  const handleOtpVerify = async () => {
    if (!formData.otp) return;

    verifyMutate(
      {
        role: formData.role,
        email: formData.email,
        collageId: formData.college,
        enteredOTP: formData.otp,
      },
      {
        onSuccess: (res) => {
          if (!res) return res;

          if (res.success) {
            toast.success(res.message || "otp verified");
            setCurrentStep("newPassword");
          }
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            toast.error(err.response?.data.message || "OTP verify failed");
          } else {
            toast.error("Something went wrong.");
          }
        },
      }
    );
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.newPassword) return;

    if (!passwordValidation.safeParse(formData.newPassword).success) return;

    resetMutate(
      {
        email: formData.email,
        role: formData.role,
        collageId: formData.college,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: (res) => {
          if (!res) return res;

          if (res.success) {
            toast.success(res.message || "password reset successfully");
            setCurrentStep("initial");
            setFormData({
              college: "",
              role: "",
              email: "",
              otp: "",
              newPassword: "",
            });

            navigate("/");
          }
        },
        onError: (err) => {
          toast.error(err.message || "password reset failed");
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          {currentStep === "initial" &&
            "Enter your details to reset your password"}
          {currentStep === "otp" && "Enter the OTP sent to your email"}
          {currentStep === "newPassword" && "Create your new password"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentStep === "initial" && (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="college">
                <GraduationCap className="w-4 h-4 inline mr-2" />
                College
              </Label>
              <Select
                value={formData.college}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, college: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your college" />
                </SelectTrigger>
                <SelectContent>
                  {isCollageSuccess &&
                    collageData &&
                    collageData.collages.length > 0 &&
                    collageData.collages.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                <Shield className="w-4 h-4 inline mr-2" />
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                isForgetPending ||
                !formData.college ||
                !formData.role ||
                !formData.email
              }
            >
              {isForgetPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        )}

        {currentStep === "otp" && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              OTP has been sent to <strong>{formData.email}</strong>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, otp: e.target.value }))
                }
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            <Button
              onClick={handleOtpVerify}
              className="w-full"
              disabled={isVerifyPending || formData.otp.length !== 6}
            >
              {isVerifyPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        )}

        {currentStep === "newPassword" && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="text-sm text-green-600 text-center font-medium">
              ✓ OTP Verified Successfully
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="text"
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                required
                minLength={8}
              />
              <div className="text-xs text-muted-foreground">
                Password must be at least 8 characters long (atleast 1 captial,
                1 small, 1 special chat)
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isResetPending || formData.newPassword.length < 8}
            >
              {isResetPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )}

        {currentStep !== "initial" && (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setCurrentStep("initial");
              setFormData({
                college: "",
                role: "",
                email: "",
                otp: "",
                newPassword: "",
              });
            }}
          >
            Start Over
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// export
export default ForgotPassword;
