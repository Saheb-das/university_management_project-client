// external import
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router";

// internal import
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import queryClient from "@/react-query/client";

// types import
import { useAsignedSubjectsByTeacherId } from "../../hooks/useAsignedSubjectsByTeacherId";
import { useRemoveAsignedSubject } from "../../hooks/useRemoveAsignedSubject";
import { toast } from "sonner";

function RemoveFromDept() {
  const { teacherId } = useParams();
  const [removingId, setRemovingId] = useState("");

  if (!teacherId) return;

  const { data, isSuccess } = useAsignedSubjectsByTeacherId(teacherId);
  const { mutate, isPending } = useRemoveAsignedSubject();

  const handleRemove = (teacherId: string, subjectId: string) => {
    setRemovingId(subjectId);

    mutate(
      { id: teacherId, subId: subjectId },
      {
        onSuccess: (res) => {
          if (!res) return res;

          if (res.removedSubject) {
            toast.success(res.message || "subject remove successfully");

            queryClient.invalidateQueries({
              queryKey: ["asign-subjects", teacherId],
            });
          }
        },
        onError: (err) => {
          toast.error(err.message || "subject remove failed");
        },
        onSettled: () => {
          setRemovingId("");
        },
      }
    );
  };

  return (
    <div className="space-y-3">
      {isSuccess && data && data.asignSubjects.length > 0 ? (
        <>
          {data.asignSubjects.map((asign) => (
            <div
              key={asign.id}
              className="flex items-center justify-between bg-background p-3 rounded-lg shadow-md border"
            >
              <div>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium"
                >
                  {asign.subject.name}
                </Badge>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-2  transition-all cursor-pointer"
                onClick={() => handleRemove(asign.teacherId, asign.subject.id)}
              >
                <Trash2 className="w-4 h-4" />
                {asign.subjectId === removingId && isPending
                  ? "Removing..."
                  : "Remove"}
              </Button>
            </div>
          ))}
        </>
      ) : (
        <p className="text-2xl">there are no asigned subjects !</p>
      )}
    </div>
  );
}

// export
export default RemoveFromDept;
