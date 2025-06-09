import { selector } from "recoil";
import { notesBySemAtom } from "./noteAtom";

interface ITransNote {
  subName: string;
  title: string;
  docUrl: string;
  teacherBy: string;
}

export const transNotesByBatchAndSemSelector = selector({
  key: "transNotesByBatchAndSemSelector",
  get: ({ get }) => {
    const raw = get(notesBySemAtom);

    if (!raw || raw.length === 0) return [];

    const transNotes = raw.reduce((acc, cur) => {
      const noteObj: ITransNote = {
        subName: cur?.subject?.name,
        docUrl: cur?.fileUrl,
        teacherBy: `${cur?.teacher?.profile?.user?.firstName} ${cur?.teacher?.profile?.user?.lastName}`,
        title: cur?.title,
      };

      acc.push(noteObj);

      return acc;
    }, [] as ITransNote[]);

    return transNotes;
  },
});
