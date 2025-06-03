// external import
import { useRecoilValue } from "recoil";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departmentsWithDegreesAtom } from "@/recoil/atoms/filterAtom";
import { SetStateAction, useState } from "react";
import { useDepartments } from "@/hooks/useDepartment";
import { useBatchesByDeptAndDegIds } from "@/hooks/useBatchesByDeptAndDegIds";
import { useStudentsListForRollReg } from "../../hooks/useStudentsListForRollReg";

interface Props {
  onBatch: React.Dispatch<SetStateAction<string>>;
}

const StudentFilter = ({ onBatch }: Props) => {
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [batch, setBatch] = useState("");
  const [selBatch, setSelBatch] = useState("");
  const deptsInfo = useRecoilValue(departmentsWithDegreesAtom);

  useDepartments("degree");
  useStudentsListForRollReg(selBatch);

  let degrees =
    deptsInfo && deptsInfo.find((item) => item.id === department)?.degrees;
  const { data: batchData, isSuccess } = useBatchesByDeptAndDegIds(
    department,
    degree
  );

  const handleClick = () => {
    onBatch(batch);
    setSelBatch(batch);
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {/* deapartment */}
          <div>
            <Label className="text-base" htmlFor="department">
              Department
            </Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-full mt-2" id="department">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {deptsInfo &&
                  deptsInfo.map((item) => (
                    <SelectItem
                      className="capitalize"
                      key={item.id}
                      value={item.id}
                    >
                      {item.type}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* degree */}
          <div>
            <Label className="text-base" htmlFor="degree">
              Degree
            </Label>
            <Select value={degree} onValueChange={setDegree}>
              <SelectTrigger className="w-full mt-2" id="degree">
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent>
                {degrees &&
                  degrees.map((item) => (
                    <SelectItem
                      className="capitalize"
                      key={item.id}
                      value={item.id}
                    >
                      {item.type}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* batch */}
          <div>
            <Label className="text-base" htmlFor="batch">
              Batch
            </Label>
            <Select value={batch} onValueChange={setBatch}>
              <SelectTrigger className="w-full mt-2" id="batch">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                {isSuccess &&
                  batchData &&
                  batchData.batches.length > 0 &&
                  batchData.batches.map((item) => (
                    <SelectItem
                      className="capitalize"
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="mt-4 cursor-pointer" onClick={handleClick}>
          Get Students
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudentFilter;
