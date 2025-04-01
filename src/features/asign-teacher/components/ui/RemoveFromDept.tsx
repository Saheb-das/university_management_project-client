// external import
import { Trash2 } from "lucide-react";

// internal import
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// types import
import { IAsignUser } from "../../pages/AsignTeacher";

interface RemoveFromDepartmentProps {
  teacher: IAsignUser;
  onRemove: (userId: string, department: string) => void;
}

function RemoveFromDept({ teacher, onRemove }: RemoveFromDepartmentProps) {
  return (
    <div className="space-y-3">
      {teacher.departments?.map((department) => (
        <div
          key={department}
          className="flex items-center justify-between bg-background p-3 rounded-lg shadow-md border"
        >
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            {department}
          </Badge>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-2  transition-all cursor-pointer"
            onClick={() => onRemove(teacher.id, department)}
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

// export
export default RemoveFromDept;
