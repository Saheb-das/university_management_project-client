// external import
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// internal import
import { registerSchema } from "@/zod/auth";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof registerSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Side: User Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">User Details</h3>

              <Select
                value={"superadmin"}
                // {...register("role")}
              >
                <SelectTrigger className="mb-4 w-full">
                  <SelectValue placeholder="select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input type="hidden" {...register("role")} />

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNo")}
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNo.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Adhaar No"
                  {...register("adhaarNo")}
                />
                {errors.adhaarNo && (
                  <p className="text-red-500 text-sm">
                    {errors.adhaarNo.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Highest Degree"
                  {...register("highestDegree")}
                />
                {errors.highestDegree && (
                  <p className="text-red-500 text-sm">
                    {errors.highestDegree.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Specialization"
                  {...register("specialization")}
                />
                {errors.specialization && (
                  <p className="text-red-500 text-sm">
                    {errors.specialization.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Account No"
                  {...register("accountNo")}
                />
                {errors.accountNo && (
                  <p className="text-red-500 text-sm">
                    {errors.accountNo.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="IFSC Code"
                  {...register("ifscCode")}
                />
                {errors.ifscCode && (
                  <p className="text-red-500 text-sm">
                    {errors.ifscCode.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Bank Name"
                  {...register("bankName")}
                />
                {errors.bankName && (
                  <p className="text-red-500 text-sm">
                    {errors.bankName.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Account Holder Name"
                  {...register("accountHolderName")}
                />
                {errors.accountHolderName && (
                  <p className="text-red-500 text-sm">
                    {errors.accountHolderName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side: College Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">College Details</h3>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="College Name"
                  {...register("collageName")}
                />
                {errors.collageName && (
                  <p className="text-red-500 text-sm">
                    {errors.collageName.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="College Address"
                  {...register("collageAddress")}
                />
                {errors.collageAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.collageAddress.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="College Reg No"
                  {...register("collageRegNo")}
                />
                {errors.collageRegNo && (
                  <p className="text-red-500 text-sm">
                    {errors.collageRegNo.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Account No"
                  {...register("collageAccountNo")}
                />
                {errors.collageAccountNo && (
                  <p className="text-red-500 text-sm">
                    {errors.collageAccountNo.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="IFSC Code"
                  {...register("collageIfscCode")}
                />
                {errors.collageIfscCode && (
                  <p className="text-red-500 text-sm">
                    {errors.collageIfscCode.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Bank Name"
                  {...register("collageBankName")}
                />
                {errors.collageBankName && (
                  <p className="text-red-500 text-sm">
                    {errors.collageBankName.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  className="mb-1"
                  type="text"
                  placeholder="Account Holder Name"
                  {...register("collageAccountHolderName")}
                />
                {errors.collageAccountHolderName && (
                  <p className="text-red-500 text-sm">
                    {errors.collageAccountHolderName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-full max-w-xs">
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

// export
export default Register;
