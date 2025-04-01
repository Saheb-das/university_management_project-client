import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({
  label,
  name,
  type,
  value,
  handleChange,
}: InputFieldProps) => {
  return (
    <div>
      <Label className="capitalize" htmlFor={name}>
        {label}
      </Label>
      {type === "file" ? (
        <Input
          className="bg-secondary text-secondary-foreground"
          type={type}
          id={name}
          name={name}
          onChange={handleChange}
          required
        />
      ) : (
        <Input
          className="bg-secondary text-secondary-foreground"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required
        />
      )}
    </div>
  );
};

// export
export default LabeledInput;
