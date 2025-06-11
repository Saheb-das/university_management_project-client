// external import
import { useRecoilValue } from "recoil";

// internal import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterFields } from "../ui/DynamicFormBuilder";
import { Label } from "@/components/ui/label";
import { useDepartments } from "@/hooks/useDepartment";
import { departmentsWithDegreesAtom } from "@/recoil/atoms/filterAtom";
import { useBatchesByDeptAndDegIds } from "@/hooks/useBatchesByDeptAndDegIds";

interface Props {
  filterFields: FilterFields;
  setFilterFields: React.Dispatch<React.SetStateAction<FilterFields>>;
}

const StudentFilter = ({ filterFields, setFilterFields }: Props) => {
  const deptsInfo = useRecoilValue(departmentsWithDegreesAtom);
  useDepartments("degree");
  let degsInfo =
    deptsInfo &&
    deptsInfo.find((item) => item.id === filterFields.department)?.degrees;

  const { data: batchData, isSuccess } = useBatchesByDeptAndDegIds(
    filterFields.department,
    filterFields.degree
  );
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {/** Department */}
        <div>
          <Label className="text-lg" htmlFor="department">
            Department
          </Label>
          <Select
            value={filterFields.department}
            onValueChange={(val) =>
              setFilterFields((prev) => ({ ...prev, department: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent className="text-base">
              {deptsInfo &&
                deptsInfo.length > 0 &&
                deptsInfo.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    className="capitalize"
                  >
                    {item.type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/** Degree */}
        <div>
          <Label className="text-lg" htmlFor="degree">
            Degree
          </Label>
          <Select
            disabled={!filterFields.department}
            value={filterFields.degree}
            onValueChange={(val) =>
              setFilterFields((prev) => ({ ...prev, degree: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent className="text-base">
              {degsInfo &&
                degsInfo.length > 0 &&
                degsInfo.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    className="capitalize"
                  >
                    {item.type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/** batch */}
        <div>
          <Label className="text-lg" htmlFor="batch">
            Batch
          </Label>
          <Select
            disabled={!filterFields.degree}
            value={filterFields.batch}
            onValueChange={(val) =>
              setFilterFields((prev) => ({
                ...prev,
                batch: val,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="text-base">
              {isSuccess &&
                batchData &&
                batchData.batches.length > 0 &&
                batchData.batches.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    className="capitalize"
                  >
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default StudentFilter;
