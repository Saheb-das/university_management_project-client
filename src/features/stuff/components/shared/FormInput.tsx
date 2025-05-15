// internal import
import { Input } from "@/components/ui/input";

// types import
import { FieldError } from "react-hook-form";

interface FormInputProps {
  label?: string;
  placeholder: string;
  error?: FieldError;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  error,
  type = "text",
}) => {
  return (
    <div>{label && <label className="text-sm font-medium">{label}</label>}</div>
  );
};

export default FormInput;
