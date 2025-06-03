// external import
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

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
import ResultFilter from "../components/ui/ResultFilter";
import FilteredList from "../components/ui/FilteredList";
import MarksInput from "../components/shared/MarksInput";
import Container from "@/components/shared/Container";
import {
  examsByCourseIdAtom,
  subjectsBySemesterAtom,
} from "../recoil/resultAtom";

// types import
import { IResultBody, ISemester } from "../types/result";
import { useResultByStudentExamSem } from "../hooks/useResultByStudentExamSem";
import { useExams } from "../hooks/useExams";
import { useCreateResult } from "../hooks/useCreateResult";
import { toast } from "sonner";

function Result() {
  const [selSemInfo, setSelSemInfo] = useState<ISemester>({} as ISemester);
  const [selStudentInfo, setSelStudentInfo] = useState({ id: "", name: "" });
  const [exam, setExam] = useState<string>("");
  const [marks, setMarks] = useState<Record<string, number>>({});
  const examsInfo = useRecoilValue(examsByCourseIdAtom);
  const subjectsInfo = useRecoilValue(subjectsBySemesterAtom);

  const { mutate, isPending } = useCreateResult();
  const { data, isSuccess } = useResultByStudentExamSem(
    selStudentInfo.id,
    exam,
    selSemInfo.id
  );
  useExams(selSemInfo.courseId);

  useEffect(() => {
    if (Object.values(selStudentInfo).every((item) => item !== "")) {
      setMarks({});
    }
  }, [selStudentInfo]);

  // TODO: functional bub
  useEffect(() => {
    if (isSuccess && data) {
      const res = data.results;

      if (res.length !== 0) {
        const existMarks = res.reduce((acc, cur) => {
          acc[cur.subjectId] = cur.marks;

          return acc;
        }, {} as Record<string, number>);

        setMarks((prev) => ({ ...prev, ...existMarks }));
      }
    }
  }, [data, isSuccess, selStudentInfo.id]);

  const handleSubmit = () => {
    const result = subjectsInfo.map((subject) => ({
      id: subject.id,
      name: subject.name,
      marks: marks[subject.id] || 0, // default to 0 if not filled
    }));

    const resultPayload: IResultBody = {
      studentId: selStudentInfo.id,
      semesterId: selSemInfo.id,
      examId: exam,
      subjects: result,
    };

    mutate(resultPayload, {
      onSuccess: (res) => {
        if (!res) return res;

        toast.success(res.message || "result create successfully");
      },
      onError: (err) => {
        toast.error(err.message || "result creation failed");
      },
      onSettled: () => {
        setMarks({});
      },
    });
  };

  return (
    <>
      <Container>
        {/* filter component */}
        <ResultFilter onSemester={setSelSemInfo} />

        <div className="grid grid-cols-12 gap-4">
          {/* student list table  */}
          <FilteredList
            selectSem={selSemInfo}
            onStudentInfo={setSelStudentInfo}
          />

          {Object.values(selStudentInfo).every((item) => item !== "") && (
            // marks input component
            <div className="col-span-4 bg-background text-foreground p-4">
              <h2 className="text-xl capitalize font-bold mb-2">
                {selStudentInfo.name}'s Subjects
              </h2>
              {/* select exam type */}
              <div className="mb-4">
                <Label className="text-base" htmlFor="exam">
                  Examination
                </Label>
                <Select value={exam} onValueChange={setExam}>
                  <SelectTrigger className="mt-2 w-full" id="exam">
                    <SelectValue placeholder="Select Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examsInfo &&
                      examsInfo.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.type}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <MarksInput
                subjects={subjectsInfo}
                marks={marks}
                onMarks={setMarks}
              />

              <Button
                disabled={isPending}
                onClick={handleSubmit}
                className="mt-4"
              >
                {isPending ? "Submitting..." : "Submit Marks"}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

// export
export default Result;
