// external import
import { selector } from "recoil";

// internal import
import {
  myTeachersAtom,
  studentUserAtom,
} from "@/features/dashboard/recoil/student/dashboardAtom";
import { resultWithDetailsAtom } from "./academicAtom";

export const transStudentAcademicSelector = selector({
  key: "transStudentAcademicSelector",
  get: ({ get }) => {
    const raw = get(studentUserAtom);

    if (!raw || !raw.profile) {
      return;
    }

    return {
      fullName: `${raw?.profile?.user?.firstName} ${raw?.profile?.user?.lastName}`,
      regNo: raw.registretionNo,
      rollNo: raw.rollNo,
      dept: raw.department.type,
      batch: raw.batch.name,
      course: raw.course.name,
      deg: raw.course.degree.type,
      curSem: raw?.currentSemester[0]?.semester?.semNo || "",
    };
  },
});

export const subjectsWithTeacherSelector = selector({
  key: "subjectsWithTeacherSelector",
  get: ({ get }) => {
    const raw = get(myTeachersAtom);

    if (!raw || raw.length === 0) return;

    const subWithTeacher = raw.reduce((acc, cur) => {
      const subObj = {
        subName: cur.subject.name,
        teacher: `${cur.teacher.profile.user.firstName} ${cur.teacher.profile.user.lastName}`,
      };

      acc.push(subObj);

      return acc;
    }, [] as { subName: string; teacher: string }[]);

    return subWithTeacher;
  },
});

interface ITransResult {
  subject: string;
  firstInternal: number;
  secondInternal: number;
  final: number;
  lab: number;
}
export const transformResultDetailsSelector = selector<ITransResult[]>({
  key: "transformResultDetailsSelector",
  get: ({ get }) => {
    const raw = get(resultWithDetailsAtom);

    if (!raw || raw.length === 0) return [];

    const resultMap: Record<string, ITransResult> = {};

    raw.forEach((item) => {
      const subjectName = item.subject.name;

      if (!resultMap[subjectName]) {
        resultMap[subjectName] = {
          subject: subjectName,
          firstInternal: 0,
          secondInternal: 0,
          final: 0,
          lab: 0,
        };
      }

      console.log("i am here");

      const examType = item.exam.type;

      if (examType === "1st-internal") {
        resultMap[subjectName].firstInternal = item.marks;
      } else if (examType === "2nd-internal") {
        resultMap[subjectName].secondInternal = item.marks;
      } else if (examType === "final") {
        resultMap[subjectName].final = item.marks;
      } else if (examType === "lab") {
        resultMap[subjectName].lab = item.marks;
      }
    });

    return Object.values(resultMap);
  },
});
