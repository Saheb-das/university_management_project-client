type TDeaprtmentType = "engineering" | "medical" | "law" | "management";

type TDegree = {
  id: string;
  type: string;
};

export interface IFilterDeptWithDeg {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: TDeaprtmentType;
  collageId: string;
  degrees: TDegree[];
}
