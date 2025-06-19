// types import
interface FormInputProps {
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label }) => {
  return (
    <div>{label && <label className="text-sm font-medium">{label}</label>}</div>
  );
};

export default FormInput;
