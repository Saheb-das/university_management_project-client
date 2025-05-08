interface IApiRes {
  message: string;
  success: boolean;
}

export type TStudentDept = {
  departmentId: string;
  departmentType: string;
  students: number;
};
export interface IStudentDeptRes extends IApiRes {
  studentStats: TStudentDept[];
}

export type TTeacherDept = {
  departmentId: string;
  departmentType: string;
  teachers: number;
};

export interface ITeacherDeptRes extends IApiRes {
  teacherStats: TTeacherDept[];
}

export type TPlacementDept = {
  departmentId: string;
  departmentName: string;
  eligible: number;
  placed: number;
};

export interface IPlacementDeptRes extends IApiRes {
  collagePlacements: TPlacementDept[];
}

export type TStuffStats = {
  id: string;
  collageId: string;
  role: string;
  count: number;
};

export interface IStuffStatsRes extends IApiRes {
  stuffStats: TStuffStats[];
}

export type TGrowthStats = {
  year: number;
  _sum: {
    students: number;
  };
};

export interface IGrowthStatsRes extends IApiRes {
  growth: TGrowthStats[];
}
