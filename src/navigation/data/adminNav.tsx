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
  CalendarClock,
  Activity,
  PackageOpen,
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
    icon: <PackageOpen size={20} />,
    label: "dropbox",
    linkPath: "dropbox",
  },
  {
    id: 5,
    icon: <GraduationCap size={20} />,
    label: "students",
    linkPath: "students",
  },
  {
    id: 6,
    icon: <Users size={20} />,
    label: "stuff",
    linkPath: "stuff",
  },
  {
    id: 7,
    icon: <ClipboardList size={20} />,
    label: "asign teachers",
    linkPath: "asign-teachers",
  },
  {
    id: 8,
    icon: <CalendarClock size={20} />,
    label: "routine",
    linkPath: "routine",
  },
  {
    id: 9,
    icon: <Activity size={20} />,
    label: "activity",
    linkPath: "activity",
  },
  {
    id: 10,
    icon: <FileInput size={20} />,
    label: "office",
    linkPath: "office",
  },
  {
    id: 11,
    icon: <School size={20} />,
    label: "collage",
    linkPath: "collage",
  },
  {
    id: 12,
    icon: <UserRoundPen size={20} />,
    label: "profile",
    linkPath: "profile",
  },

  { id: 13, icon: <LogOut size={20} />, label: "logout", linkPath: "logout" },
];
