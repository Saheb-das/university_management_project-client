interface IApiRes {
  success: boolean;
  message: string;
}

export interface ICourse {
  id: string;
  name: string;
  duration: number;
  courseFees: string;
  numberOfSem: number;
  degreeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseRes extends IApiRes {
  course: ICourse;
}
