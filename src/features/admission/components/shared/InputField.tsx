import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  register,
  error,
}) => {
  return (
    <div>
      <Input
        className="mb-1"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
