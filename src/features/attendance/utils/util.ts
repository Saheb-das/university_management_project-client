import { IStudent } from "@/features/result/types/result";

export function makeAttendanceSheet(students: IStudent[]) {
  return students.reduce((acc, cur) => {
    acc[cur.id] = false;
    return acc;
  }, {} as Record<string, boolean>);
}
