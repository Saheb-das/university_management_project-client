interface IApiRes {
  success: boolean;
  message: string;
}

type TDeaprtmentType = "engineering" | "medical" | "law" | "management";

type TDegreeType = "bachelor" | "master" | "phd" | "diploma";

export interface IDeprtClient {
  type: TDeaprtmentType;
  degree: TDegreeType[];
}

export type TDeprtWithDeg = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: TDeaprtmentType;
  collageId: string;
  degrees: TDegree[];
};

export interface IDeptRes extends IApiRes {
  department: TDeprtWithDeg;
}

export interface IDeprtsRes extends IApiRes {
  departments: TDeprtWithDeg[];
}

export type TDegree = {
  id: string;
  type: string;
};
