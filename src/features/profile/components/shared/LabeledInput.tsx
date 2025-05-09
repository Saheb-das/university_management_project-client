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
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label
        htmlFor={name}
        className="capitalize text-sm font-medium text-foreground"
      >
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className="bg-muted/20 border border-border focus-visible:ring-2 focus-visible:ring-primary transition-colors"
      />
    </div>
  );
};

// export
export default LabeledInput;
