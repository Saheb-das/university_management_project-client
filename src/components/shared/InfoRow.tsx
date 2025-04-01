// internal import
import { Label } from "@/components/ui/label";

interface LabeledValue {
  label: string;
  name: string;
}

function InfoRow({ label, name }: LabeledValue) {
  return (
    <>
      <div>
        <Label className="capitalize text-lg text-muted-foreground ">
          {label}
        </Label>
        <p className="text-foreground font-medium">{name}</p>
      </div>
    </>
  );
}

// export
export default InfoRow;
