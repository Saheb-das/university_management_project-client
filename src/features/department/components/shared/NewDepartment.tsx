// external import
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
import { useCreateDepartment } from "../../hooks/useCreateDepartment";
import { departmentsAtom } from "../../recoil/departmentAtom";
import { useDepartments } from "../../hooks/useDepartments";
import DepartmentCard from "./DepartmentCard";
import { departmentSchema } from "@/zod/collage";
import { toast } from "sonner";

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
  const [err, setErr] = useState(false);
  useDepartments("degree");

  const deptsWithDegs = useRecoilValue(departmentsAtom);

  const setDeprts = useSetRecoilState(departmentsAtom);

  const { mutate, isPending } = useCreateDepartment();

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
    const result = departmentSchema.safeParse(newDepartment);
    if (!result.success) setErr((prev) => !prev);

    mutate(result.data, {
      onSuccess: (res) => {
        const newDept = res?.department;
        const message = res?.message;
        setDeprts((prev) => {
          if (!prev) return prev;

          return prev.map((dept) =>
            dept.type === newDept?.type
              ? {
                  ...dept,
                  degrees: [...newDept.degrees],
                }
              : dept
          );
        });
        toast.success(message);
        setNewDepartment(initNewDepartment);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <>
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
              <SelectItem value="management">Management</SelectItem>
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
        <Button
          className="w-full cursor-pointer"
          onClick={handleCreateDepartment}
          disabled={err || isPending}
        >
          {isPending ? "Creating..." : "Create Department"}
        </Button>
      </div>

      {/* show department with degree */}
      <div className="p-4 mt-4 grid grid-cols-2 gap-4">
        {deptsWithDegs ? (
          <>
            {deptsWithDegs.map((dept) => (
              <DepartmentCard department={dept} key={dept.id} />
            ))}
          </>
        ) : (
          <>
            <p>there are not department yet</p>
          </>
        )}
      </div>
    </>
  );
};

// export
export default NewDepartment;
