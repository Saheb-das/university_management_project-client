// external import
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// internal import
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loginSchema, TRole } from "@/zod/auth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type FormData = z.infer<typeof loginSchema>;

function Login() {
  const [role, setRole] = useState<TRole>("student");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  // initial set role
  setValue("role", role);

  const handleChange = (value: TRole) => {
    setRole(value);
    setValue("role", value || role);
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const result = console.log(data);

      console.log("result", result);
    } catch (error) {
      console.error("errors: ", error);
    } finally {
      reset();
    }
  };
  return (
    <>
      <div className="w-[370px] md:w-[400px] h-auto mx-auto py-4 px-7 mt-5 border rounded">
        <h1 className=" font-semibold text-center text-2xl md:text-3xl mb-5">
          Log In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* role field */}
          <Select
            value={role}
            onValueChange={handleChange}
            // {...register("role")}
          >
            <SelectTrigger className="mb-4 w-full">
              <SelectValue placeholder="select your role" />
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
          <input type="hidden" {...register("role")} />

          {/* email field */}
          <div className="mb-4">
            <Input
              className="mb-1 text-lg"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors["email"]?.message && (
              <p className="err_msg">{errors["email"]?.message}</p>
            )}
          </div>

          {/* create Password field */}
          <div className="mb-4">
            <Input
              className="mb-1"
              type="password"
              placeholder=" Password"
              {...register("password")}
            />
            {errors["password"]?.message && (
              <p className="err_msg">{errors["password"]?.message}</p>
            )}
          </div>

          <Button type="submit" variant="default" className="block ml-auto ">
            register
          </Button>
          <p className="text-center my-3">
            password forgotten. &nbsp;
            <Link className=" font-bold text-blue-800 " to={"/forgot-password"}>
              forgot password
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

// export
export default Login;
