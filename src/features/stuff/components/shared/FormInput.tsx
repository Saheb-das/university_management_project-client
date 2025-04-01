// internal import
import { Input } from "@/components/ui/input";

// types import
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  register,
  error,
  type = "text",
}) => {
  return (
    <div>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        className="mb-1"
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default FormInput;
