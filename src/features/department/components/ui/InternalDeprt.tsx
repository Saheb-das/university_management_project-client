import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departmentTypes = ["internal"];

const InternalDepartment = () => {
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    type: "",
  });

  const handleDepartmentChange = (field: string, value: string) => {
    setNewDepartment((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateDepartment = () => {
    setNewDepartment({ name: "", type: "" });
  };

  return (
    <div className="space-y-4 p-4 bg-background text-foreground">
      <Label>Department Name</Label>
      <Input
        value={newDepartment.name}
        onChange={(e) => handleDepartmentChange("name", e.target.value)}
      />

      <Label>Department Type</Label>
      <Select onValueChange={(value) => handleDepartmentChange("type", value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select department type" />
        </SelectTrigger>
        <SelectContent>
          {departmentTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-full" onClick={handleCreateDepartment}>
        Create Department
      </Button>
    </div>
  );
};

export default InternalDepartment;
