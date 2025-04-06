// external import
import React, { useEffect, useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import BatchList from "./BatchList";
import BatchForm from "./BatchForm";

export type TBatch = {
  id: string;
  title: string;
};

const departments = ["CSE", "ECE", "ME"];
const degreesMap: Record<string, string[]> = {
  CSE: ["B.Tech", "M.Tech"],
  ECE: ["B.Tech"],
  ME: ["B.Tech", "Diploma"],
};
const coursesMap: Record<string, string[]> = {
  "B.Tech": ["DSA", "DBMS", "OS"],
  "M.Tech": ["ML", "AI"],
  Diploma: ["Workshop", "Mechanics"],
};

const batchList = [
  { title: "bachelor_CSE_2021", id: "batch1" },
  { title: "master_DS_2021", id: "batch2" },
];

const BatchSelector: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");
  const [isGet, setIsGet] = useState(false);
  const [batches, setBatches] = useState<TBatch[]>([]);

  const fetchBatch = async () => {
    // TODO: if batch is undefined, then setIsGet is true
    setIsGet(true);
  };

  const handleCreateBatch = (year: string) => {
    // TODO: create new batch
  };

  useEffect(() => {}, []);

  return (
    <div className="space-y-4 p-6 border rounded-lg mb-6">
      <div className="grid grid-cols-12  gap-4">
        <Select onValueChange={setDepartment}>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={degree} onValueChange={setDegree} disabled={!department}>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="Select Degree" />
          </SelectTrigger>
          <SelectContent>
            {degreesMap[department]?.map((deg) => (
              <SelectItem key={deg} value={deg}>
                {deg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={course} onValueChange={setCourse} disabled={!degree}>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {coursesMap[degree]?.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="col-span-2 col-start-11 cursor-pointer"
          onClick={fetchBatch}
          disabled={!department || !degree || !course}
        >
          Get Batch
        </Button>
      </div>
      {isGet && batches.length === 0 ? (
        <BatchForm onGetYear={handleCreateBatch} />
      ) : (
        <BatchList list={batches} />
      )}
    </div>
  );
};

export default BatchSelector;
