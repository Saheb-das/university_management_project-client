interface IApiRes {
  success: boolean;
  message: string;
}

type DeptType = "law" | "engineering" | "medical" | "management";
type TShortDepartment = {
  id: string;
  type: DeptType | string;
};

type TCollageEnrollmentStats = {
  id: string;
  totalStudents: number;
  totalTeachers: number;
  collageId: string;
};

export type TCollage = {
  id: string;
  name: string;
  address: string;
  registrationNo: string;
  approvedBy: string | null;
  avatar: string | null;
  ranking: number | null;
  established: string;
  programs: string[];
  campusSize: string | number | null;
  bankAccountId: string;
  createdAt: string;
  updatedAt: string;
  departments: TShortDepartment[];
  collageEnrollmentStats: TCollageEnrollmentStats;
};

export interface ICollageRes extends IApiRes {
  collage: TCollage;
}

export interface ICollageUpdatePayload {
  approvedBy?: string;
  ranking?: string;
  campusSize?: string;
  programs?: string[];
}
