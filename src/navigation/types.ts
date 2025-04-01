import { ReactNode } from "react";

export interface NavObj {
  id: number;
  icon: ReactNode;
  label: string;
  linkPath: string;
}
