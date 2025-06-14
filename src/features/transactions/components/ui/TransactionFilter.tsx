// external import
import { useState } from "react";

// internal import
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IFilterProps, TransactionType } from "../../pages/Transactions";
import { localDateStrToYYYYMMDD } from "@/utils/convertStr";

interface ITransactionFilter {
  onFilter: ({ date, type }: IFilterProps) => void;
  utr: string;
  setUtr: React.Dispatch<React.SetStateAction<string>>;
}

const TransactionFilter = ({ onFilter, utr, setUtr }: ITransactionFilter) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [type, setType] = useState<TransactionType | "all">("all");

  const handleApply = () => {
    const formatDate = date && localDateStrToYYYYMMDD(date);

    onFilter({ date: formatDate, type });
  };
  return (
    <div className="p-3 mb-4 rounded-lg ">
      <div className="grid grid-cols-3 gap-4 mb-8 ">
        {/* Date Picker */}
        <div>
          <Label htmlFor="date" className="mb-2">
            From Date
          </Label>
          <Popover>
            <PopoverTrigger className="w-full">
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Select Type */}
        <div>
          <Label htmlFor="type" className="mb-2">
            Type
          </Label>
          <Select
            value={type}
            onValueChange={(value) =>
              setType(value as "all" | "salary" | "tutionFee")
            }
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="tutionFee">Tuition Fees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Filters Button */}
        <Button className="mt-5 w-fit" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>

      {/* UTR Input */}
      <div>
        <Label htmlFor="utr" className="mb-2">
          UTR Number
        </Label>
        <Input
          id="utr"
          placeholder="Search UTR"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TransactionFilter;
