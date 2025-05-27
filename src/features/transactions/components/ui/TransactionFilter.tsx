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

interface ITransactionFilter {
  onFilter: ({ date, type, utr }: IFilterProps) => void;
}

const TransactionFilter = ({ onFilter }: ITransactionFilter) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [type, setType] = useState<TransactionType | "all">("all");
  const [utr, setUtr] = useState("");
  return (
    <div className="p-3 mb-4 rounded-lg ">
      <div className="grid grid-cols-3 gap-4 mb-4 ">
        {/* Date Picker */}
        <div>
          <Label htmlFor="date" className="mb-2">
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
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
                initialFocus
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
              setType(value as "all" | "salary" | "tuition-fees")
            }
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="tuition-fees">Tuition Fees</SelectItem>
            </SelectContent>
          </Select>
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

      {/* Apply Filters Button */}
      <Button onClick={() => onFilter({ date, type, utr })}>
        Apply Filters
      </Button>
    </div>
  );
};

export default TransactionFilter;
