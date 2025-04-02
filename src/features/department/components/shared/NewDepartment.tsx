// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface INewDepartment {
  type: string;
  degree: string[];
}

const initNewDepartment: INewDepartment = {
  type: "",
  degree: [],
};

export const degreeOptions = ["bachelor", "master", "phd", "diploma"];

const NewDepartment = () => {
  const [newDepartment, setNewDepartment] =
    useState<INewDepartment>(initNewDepartment);

  const handleDepartmentChange = (value: string) => {
    setNewDepartment((prev) => ({ ...prev, type: value }));
  };

  const handleDegreeChange = (degree: string) => {
    setNewDepartment((prev) => {
      const newDegrees = prev.degree.includes(degree)
        ? prev.degree.filter((d) => d !== degree)
        : [...prev.degree, degree];
      return { ...prev, degree: newDegrees };
    });
  };

  const handleCreateDepartment = () => {
    console.log("new department", newDepartment);

    setNewDepartment(initNewDepartment);
  };

  return (
    <div className="space-y-4 p-4 bg-background text-foreground">
      <div>
        <Label className="text-base" htmlFor="dept-type">
          Department Type
        </Label>
        <Select onValueChange={handleDepartmentChange}>
          <SelectTrigger id="dept-type" className="w-full">
            <SelectValue placeholder="Select department type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="law">Law</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-base">Degree</Label>
        <div className="grid grid-cols-2 gap-3">
          {degreeOptions.map((degree) => (
            <label
              key={degree}
              htmlFor={degree}
              className={`flex items-center justify-center capitalize gap-2 p-3 border rounded-lg cursor-pointer transition-all 
        ${
          newDepartment.degree.includes(degree)
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-accent"
        }`}
            >
              <Checkbox
                id={degree}
                checked={newDepartment.degree.includes(degree)}
                onCheckedChange={() => handleDegreeChange(degree)}
                className="hidden"
              />
              <span className="text-sm font-medium">{degree}</span>
            </label>
          ))}
        </div>
      </div>
      <Button className="w-full" onClick={handleCreateDepartment}>
        Create Department
      </Button>
    </div>
  );
};

// export
export default NewDepartment;
