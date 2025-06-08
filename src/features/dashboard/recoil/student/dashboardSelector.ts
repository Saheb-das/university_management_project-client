// external import
import { selector } from "recoil";

// internal import
import { myTeachersAtom } from "./dashboardAtom";

type TMergedTeacher = {
  id: string;
  teacherName: string;
  subject: string;
  imgPath: string;
  mailLink: string;
};

export const transformMyTeacherSelector = selector<TMergedTeacher[]>({
  key: "transformMyTeacherSelector",
  get: ({ get }) => {
    const raw = get(myTeachersAtom);

    const map: Record<string, TMergedTeacher> = {};

    raw.forEach((cur) => {
      if (!map[cur.teacherId]) {
        map[cur.teacherId] = {
          id: cur.id,
          teacherName: `${cur.teacher.profile.user.firstName} ${cur.teacher.profile.user.lastName}`,
          subject: cur.subject.name,
          imgPath: cur.teacher.profile.avatar || "",
          mailLink: cur.teacher.profile.user.email,
        };
      } else {
        map[cur.teacherId].subject += `,${cur.subject.name}`;
      }
    });

    return Object.values(map);
  },
});
