// external import
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useSetRecoilState } from "recoil";

// internal import
import { loginSchema, TRole } from "@/zod/auth";
import { useLogin } from "../hooks/useLogin";
import { setAuthToken } from "@/utils/localStorage";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

type FormData = {
  email: string;
  password: string;
  role: TRole;
};

type TApiResponse = {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    role: TRole;
    email: string;
    collageId: string;
    name: string;
    avatar: string;
  };
};

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const setBasicUser = useSetRecoilState(userBasicAtom);

  const validate = () => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors: typeof errors = {};
      if (fieldErrors.email) formattedErrors.email = fieldErrors.email[0];
      if (fieldErrors.password)
        formattedErrors.password = fieldErrors.password[0];
      if (fieldErrors.role) formattedErrors.role = fieldErrors.role[0];
      setErrors(formattedErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: TRole) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    mutate(formData, {
      onSuccess: (res: TApiResponse) => {
        const { user, token } = res;
        setAuthToken(token.split(" ")[1]);
        setBasicUser(user);
        navigate(`/${user.role}s/${user.id}`);
      },
      onSettled: () => {
        setFormData({ email: "", password: "", role: "student" });
      },
    });
  };

  return (
    <div className="w-[370px] md:w-[400px] mx-auto py-4 px-7 mt-5 border rounded">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-5">
        Log In
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <Select onValueChange={handleRoleChange} defaultValue={formData.role}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="counsellor">Counsellor</SelectItem>
                <SelectItem value="accountant">Accountant</SelectItem>
                <SelectItem value="examceller">Examceller</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="ml-auto block">
          {isPending ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center my-3 text-sm">
          Password forgotten?{" "}
          <Link
            to="/forgot-password"
            className="font-bold text-blue-700 hover:underline"
          >
            Reset here
          </Link>
        </p>
      </form>
    </div>
  );
}
