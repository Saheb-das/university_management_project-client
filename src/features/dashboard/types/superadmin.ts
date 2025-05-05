export type TStudentDeptRes = {
  departmentId: string;
  departmentType: string;
  students: number;
};

export type TTeacherDeptRes = {
  departmentId: string;
  departmentType: string;
  teachers: number;
};

export type TPlacementDeptRes = {
  departmentId: string;
  departmentName: string;
  eligible: number;
  placed: number;
};

export type TStuffStatsRes = {
  id: string;
  collageId: string;
  role: string;
  count: number;
};

export type TGrowthStatsRes = {
  year: number;
  _sum: {
    students: number;
  };
};
