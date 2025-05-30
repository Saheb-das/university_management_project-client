import { IGetSchedule } from "@/features/routine/types/routine";
type TType = "day" | "break" | "class";

export interface ILecture {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
  type: TType;
}

export interface IDay {
  type: TType;
  today: string;
}

export interface IBreak {
  type: TType;
}

export type TSchedule = ILecture | IBreak | IDay;

export function isClass(item: TSchedule): item is ILecture {
  return item.type === "class";
}

export function isBreak(item: TSchedule): item is IBreak {
  return item.type === "break";
}

export function isDay(item: TSchedule): item is IDay {
  return item.type === "day";
}

export function convertRoutine(day: IGetSchedule) {
  const today = day.day;
  const breakTime = day.break.split("-");

  const scheduleArr: TSchedule[] = [];
  scheduleArr.push({ type: "day", today: today });

  for (let i = 0; i < day.lectures.length; i++) {
    if (day.lectures[i].endTime === breakTime[0].trim()) {
      scheduleArr.push({ type: "break" });
    } else {
      scheduleArr.push({ ...day.lectures[i], type: "class" });
    }
  }

  return scheduleArr;
}
