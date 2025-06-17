// external import
import { useQuery } from "@tanstack/react-query";

// internal import
import { getLecturesByTeacherUserIdAndDay } from "@/api/services/routine";

export const useTeacherScheduleByDay = (userId: string, day: string) => {
  return useQuery({
    queryKey: ["routine-lectures", userId, day],
    queryFn: () => getLecturesByTeacherUserIdAndDay({ userId, day }),
    enabled: !!userId && !!day,
  });
};
