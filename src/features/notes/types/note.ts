interface IApiRes {
  message: string;
  success: boolean;
}

interface INote {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  teacherId: string;
  semesterId: string;
  batchId: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface INoteWithTeacherAndSubject extends INote {
  teacher: {
    profile: {
      user: {
        firstName: string;
        lastName: string;
        id: string;
      };
    };
  };
  subject: {
    name: string;
  };
}

export interface INotesWithTeacherAndSubRes extends IApiRes {
  notes: INoteWithTeacherAndSubject[];
}
