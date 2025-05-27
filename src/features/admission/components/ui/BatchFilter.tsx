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
import { useBatchFilter } from "../../hooks/useBatchFilter";

const BatchSelector = () => {
  const {
    department,
    setDepartment,
    degree,
    setDegree,
    course,
    setCourse,
    degrees,
    deptInfo,
    coursesInfo,
    fetchBatch,
    handleCreateBatch,
    batches,
    isGet,
    isDisabled,
  } = useBatchFilter();

  return (
    <div className="space-y-4 p-6 border rounded-lg mb-6">
      <div className="grid grid-cols-12  gap-4">
        <Select onValueChange={setDepartment}>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {deptInfo.length > 0 &&
              deptInfo.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.type}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={degree} onValueChange={setDegree} disabled={!department}>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="Select Degree" />
          </SelectTrigger>
          <SelectContent>
            {degrees &&
              degrees.map((deg) => (
                <SelectItem key={deg.id} value={deg.id}>
                  {deg.type}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={course} onValueChange={setCourse} disabled={!degree}>
          <SelectTrigger className="col-span-3 w-full">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {coursesInfo.length > 0 &&
              coursesInfo.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Button
          className="col-span-2 col-start-11 cursor-pointer"
          onClick={fetchBatch}
          disabled={isDisabled}
        >
          Get Batch
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          {isGet && <BatchForm onGetYear={handleCreateBatch} />}
        </div>
        <BatchList list={batches} />
      </div>
    </div>
  );
};

export default BatchSelector;
