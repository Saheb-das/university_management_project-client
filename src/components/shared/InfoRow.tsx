// internal import
import { Label } from "@/components/ui/label";

interface LabeledValue {
  label: string;
  name: string;
}

function InfoRow({ label, name }: LabeledValue) {
  return (
    <>
      <div className="bg-muted p-4 rounded-2xl shadow-sm space-y-1">
        <Label className="capitalize text-sm text-muted-foreground tracking-wide">
          {label}
        </Label>
        <p className="text-lg font-semibold text-foreground break-words">
          {name}
        </p>
      </div>
    </>
  );
}

// export
export default InfoRow;
