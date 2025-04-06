import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

interface IBatchFormProps {
  onGetYear: (year: string) => void;
}

const BatchForm = ({ onGetYear }: IBatchFormProps) => {
  const [admissionYear, setAdmissionYear] = useState("");

  const handleAdmission = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmissionYear(e.target.value);
  };

  return (
    <div>
      <Input
        value={admissionYear}
        onChange={handleAdmission}
        type="text"
        placeholder="admission year"
      />
      <Button
        onClick={() => onGetYear(admissionYear)}
        className="capitalize cursor-pointer"
      >
        create batch
      </Button>
    </div>
  );
};

export default BatchForm;
