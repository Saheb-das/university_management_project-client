// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { Label } from "@/components/ui/label";
import NoteItem from "../components/shared/NoteItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studentUserAtom } from "@/features/dashboard/recoil/student/dashboardAtom";
import { useSemestersByBatchId } from "@/hooks/useSemesterByBatchId";
import { useNotesByBatchAndSemIds } from "../hooks/useNotesByBatchAndSemIds";
import { transNotesByBatchAndSemSelector } from "../recoil/noteSelector";

const Notes = () => {
  const studentInfo = useRecoilValue(studentUserAtom);
  const [selSem, setSelSem] = useState("");
  useNotesByBatchAndSemIds(studentInfo?.batchId || "", selSem);
  const { data: semData, isSuccess: isSemSuccess } = useSemestersByBatchId(
    studentInfo?.batchId
  );
  const notesInfo = useRecoilValue(transNotesByBatchAndSemSelector);

  return (
    <div className=" pt-6 px-2">
      <div className="my-4 pb-6">
        <Label className="text-base" htmlFor="semester">
          Semester
        </Label>
        <Select value={selSem} onValueChange={setSelSem}>
          <SelectTrigger id="semester" className="w-full">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            {isSemSuccess &&
              semData &&
              semData.batchSemDetails.course.semesters.length > 0 &&
              semData.batchSemDetails.course.semesters.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  semester {item.semNo}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-3   gap-4">
        {notesInfo && notesInfo.length > 0 ? (
          notesInfo.map((item, idx) => (
            <NoteItem
              subName={item.subName}
              teacherBy={item.teacherBy}
              title={item.title}
              docUrl={item.docUrl}
              key={idx}
            />
          ))
        ) : (
          <p className="font-semibold text-lg font-mono">There are no notes</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
