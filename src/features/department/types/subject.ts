interface IApiRes {
  success: boolean;
  message: string;
}

export type TSubject = {
  name: string;
  code: string;
  credit: number;
};

export interface ISemesterSubjects {
  [key: string]: TSubject[];
}

export interface ISubjectsRes extends IApiRes {
  subjects: {
    count: number;
  };
}
