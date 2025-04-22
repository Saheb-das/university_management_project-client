// external import
import { useState } from "react";

// internal import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterProps {
  onGet: (value: string) => void;
}

const batchList = [
  { id: "1", batchName: "bachelor-CSE-2020" },
  { id: "2", batchName: "bachelor-CSE-2021" },
  { id: "3", batchName: "bachelor-ECE-2020" },
  { id: "4", batchName: "bachelor-EEE-2019" },
  { id: "5", batchName: "bachelor-MECH-2022" },
  { id: "6", batchName: "bachelor-CIVIL-2023" },
  { id: "7", batchName: "master-CSE-2022" },
  { id: "8", batchName: "master-ECE-2021" },
  { id: "9", batchName: "master-MATH-2020" },
  { id: "10", batchName: "diploma-IT-2021" },
];

const BatchFilter = ({ onGet }: FilterProps) => {
  const [batches, setBatches] = useState(batchList);
  const [selected, setSelected] = useState(batchList[0].batchName || "");

  const handleClick = () => {
    if (selected) onGet(selected);
  };

  return (
    <div className="w-[50%] mb-6 flex items-center gap-4">
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-[60%]">
          <SelectValue placeholder="select batch name" />
        </SelectTrigger>
        <SelectContent>
          {batches &&
            batches.map((batch) => (
              <SelectItem key={batch.id} value={batch.batchName}>
                {batch.batchName}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Button
        variant={"secondary"}
        className="cursor-pointer"
        onClick={handleClick}
      >
        Get Routine
      </Button>
    </div>
  );
};

// export
export default BatchFilter;
