// external import
import { ChangeEvent, useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        onClick={() => {
          onGetYear(admissionYear);
          setAdmissionYear("");
        }}
        className="capitalize cursor-pointer mt-2"
      >
        create batch
      </Button>
    </div>
  );
};

export default BatchForm;
