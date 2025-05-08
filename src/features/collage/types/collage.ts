type DeptType = "law" | "engineering" | "medical" | "management";
type TShortDepartment = {
  id: string;
  type: DeptType | string;
};

export type TCollageRes = {
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
};
