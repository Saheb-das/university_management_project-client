// external import
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// internal import
import { Button } from "@/components/ui/button";
import { stuffSchema, TStuffClient } from "@/zod/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "../components/shared/FormInput";

const CreateStuff = ({ admin }: { admin: Boolean }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleValue, setRoleValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStuffClient>({
    resolver: zodResolver(stuffSchema),
  });

  const onSubmit = async (data: TStuffClient) => {
    setIsSubmitting(true);
    // Here you would typically send the data to your API
    console.log(data);
    // TODO:  Simulate API call

    setIsSubmitting(false);
    alert("User created successfully!");
  };
  return (
    <div className="px-4 py-6 border rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Select onValueChange={setRoleValue} value={roleValue}>
            <SelectTrigger className="mb-1 w-full">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {admin ? (
                <>
                  <SelectItem value="admin">Admin</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="examceller">Examceller</SelectItem>
                  <SelectItem value="accountent">Accountent</SelectItem>
                  <SelectItem value="counsellor">Counsellor</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          {errors.role?.message && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <FormInput
          placeholder="First Name"
          register={register("firstName")}
          error={errors.firstName}
        />

        <FormInput
          placeholder="Last Name"
          register={register("lastName")}
          error={errors.lastName}
        />

        <FormInput
          placeholder="Email"
          type="email"
          register={register("email")}
          error={errors.email}
        />

        <FormInput
          placeholder="Password"
          type="password"
          register={register("password")}
          error={errors.password}
        />

        <FormInput
          placeholder="Address"
          register={register("address")}
          error={errors.address}
        />

        <FormInput
          placeholder="Phone Number"
          type="tel"
          register={register("phoneNo")}
          error={errors.phoneNo}
        />

        <FormInput
          placeholder="Aadhar Number"
          register={register("aadharNo")}
          error={errors.aadharNo}
        />

        <FormInput
          placeholder="Highest Degree"
          register={register("highestDegree")}
          error={errors.highestDegree}
        />

        <FormInput
          placeholder="Specialization"
          register={register("specialization")}
          error={errors.specialization}
        />

        <FormInput
          placeholder="Bank Name"
          register={register("bankName")}
          error={errors.bankName}
        />

        <FormInput
          placeholder="IFSC Code"
          register={register("ifscCode")}
          error={errors.bankName}
        />

        <FormInput
          placeholder="Account Number"
          register={register("accountNo")}
          error={errors.accountNo}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </form>
    </div>
  );
};

// export
export default CreateStuff;
