import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { registerSchema } from "@/zod/auth";

// UI Components
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
import { useRegister } from "../hooks/useRegister";
import { IRegisterClient } from "../../../types/auth";

function Register() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const [formData, setFormData] = useState({
    role: "superadmin",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNo: "",
    adhaarNo: "",
    highestDegree: "",
    specialization: "",
    accountNo: "",
    ifscCode: "",
    bankName: "",
    accountHolderName: "",
    collageName: "",
    collageAddress: "",
    collageRegNo: "",
    collageEstablishedYear: "",
    collageAccountNo: "",
    collageIfscCode: "",
    collageBankName: "",
    collageAccountHolderName: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({}); // Clear previous errors

    const transformedData: IRegisterClient = {
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "superadmin",
        address: formData.address,
        phoneNo: formData.phoneNo,
        adhaarNo: formData.adhaarNo,
        highestDegree: formData.highestDegree,
        specializedIn: formData.specialization,
        accountNo: formData.accountNo,
        ifscCode: formData.ifscCode,
        bankName: formData.bankName,
        accountHolderName: formData.accountHolderName,
      },
      collage: {
        name: formData.collageName,
        address: formData.collageAddress,
        registrationNo: formData.collageRegNo,
        established: formData.collageEstablishedYear,
      },
      collageBankDetails: {
        accountNo: formData.collageAccountNo,
        ifscCode: formData.collageIfscCode,
        bankName: formData.collageBankName,
        accountHolderName: formData.collageAccountHolderName,
      },
    };

    mutate(transformedData, {
      onSuccess: () => navigate("/"),
      onError: (err) => console.error("Registration failed", err),
    });
  };

  const renderInput = (
    name: keyof typeof formData,
    placeholder: string,
    type = "text"
  ) => (
    <div className="mb-4">
      <Input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="mb-1"
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* User Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">User Details</h3>

            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="mb-4 w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {renderInput("firstName", "First Name")}
            {renderInput("lastName", "Last Name")}
            {renderInput("email", "Email", "email")}
            {renderInput("password", "Password", "password")}
            {renderInput("address", "Address")}
            {renderInput("phoneNo", "Phone Number")}
            {renderInput("adhaarNo", "Adhaar No")}
            {renderInput("highestDegree", "Highest Degree")}
            {renderInput("specialization", "Specialization")}
            {renderInput("accountNo", "Account No")}
            {renderInput("ifscCode", "IFSC Code")}
            {renderInput("bankName", "Bank Name")}
            {renderInput("accountHolderName", "Account Holder Name")}
          </div>

          {/* College Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">College Details</h3>

            {renderInput("collageName", "College Name")}
            {renderInput("collageAddress", "College Address")}
            {renderInput("collageRegNo", "College Reg No")}
            {renderInput("collageEstablishedYear", "College Established Year")}
            {renderInput("collageAccountNo", "College Account No")}
            {renderInput("collageIfscCode", "College IFSC Code")}
            {renderInput("collageBankName", "College Bank Name")}
            {renderInput(
              "collageAccountHolderName",
              "College Account Holder Name"
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full cursor-pointer"
        >
          {isPending ? "Submiting..." : "Register"}
        </Button>
      </form>
    </div>
  );
}

export default Register;
