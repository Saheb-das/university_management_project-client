import {
  LayoutDashboard,
  IdCard,
  IndianRupee,
  Speech,
  Users,
  PackageOpen,
  FileInput,
  School,
  UserRoundPen,
  LogOut,
} from "lucide-react";
import { NavObj } from "../types";

export const examcellerNavLists: NavObj[] = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    label: "dashboard",
    linkPath: "",
  },
  {
    id: 2,
    icon: <IdCard size={20} />,
    label: "results",
    linkPath: "results",
  },
  {
    id: 3,
    icon: <IndianRupee size={20} />,
    label: "salary",
    linkPath: "salary",
  },
  {
    id: 4,
    icon: <Speech size={20} />,
    label: "announcement",
    linkPath: "announcement",
  },
  {
    id: 5,
    icon: <Users size={20} />,
    label: "community",
    linkPath: "community",
  },
  {
    id: 6,
    icon: <PackageOpen size={20} />,
    label: "dropbox",
    linkPath: "dropbox",
  },
  {
    id: 7,
    icon: <FileInput size={20} />,
    label: "office",
    linkPath: "office",
  },
  {
    id: 8,
    icon: <School size={20} />,
    label: "collage",
    linkPath: "collage",
  },
  {
    id: 9,
    icon: <UserRoundPen size={20} />,
    label: "profile",
    linkPath: "profile",
  },
  { id: 10, icon: <LogOut size={20} />, label: "logout", linkPath: "logout" },
];
