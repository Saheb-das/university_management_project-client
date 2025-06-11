// types import
import { TRole } from "@/zod/auth";

export type TActiveStatus = "regular" | "suspend" | "blocked";

export type TBasicUser = {
  id: string;
  role: TRole;
  name: string;
  email: string;
  collageId: string;
};
