interface IApiRes {
  success: boolean;
  message: string;
}

export interface INewMaterialBody {
  title: string;
  batchName: string;
  semNo: string;
  subName: string;
  filePath: string;
}

interface INote {
  title: string;
  id: string;
  date: string;
  fileUrl: string;
  teacherId: string;
  semesterId: string;
  batchId: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateNoteRes extends IApiRes {
  note: INote;
}

export interface INoteWithSub {
  title: string;
  id: string;
  date: string;
  fileUrl: string;
  teacherId: string;
  semesterId: string;
  batchId: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  subject: {
    name: string;
  };
}
export interface INotesByBatchIdRes extends IApiRes {
  notes: INoteWithSub[];
}
