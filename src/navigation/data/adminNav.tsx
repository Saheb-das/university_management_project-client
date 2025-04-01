import {
  LayoutDashboard,
  IndianRupee,
  Speech,
  GraduationCap,
  FileInput,
  School,
  UserRoundPen,
  LogOut,
  Users,
  ClipboardList,
} from "lucide-react";
import { NavObj } from "../types";

export const adminNavLists: NavObj[] = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    label: "dashboard",
    linkPath: "",
  },
  {
    id: 2,
    icon: <IndianRupee size={20} />,
    label: "salary",
    linkPath: "salary",
  },
  {
    id: 3,
    icon: <Speech size={20} />,
    label: "announcement",
    linkPath: "announcement",
  },
  {
    id: 4,
    icon: <GraduationCap size={20} />,
    label: "students",
    linkPath: "students",
  },
  {
    id: 5,
    icon: <Users size={20} />,
    label: "stuff",
    linkPath: "stuff",
  },
  {
    id: 6,
    icon: <ClipboardList size={20} />,
    label: "asign teachers",
    linkPath: "asign-teachers",
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
