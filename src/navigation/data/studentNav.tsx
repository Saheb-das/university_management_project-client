import {
  LayoutDashboard,
  GraduationCap,
  IndianRupee,
  NotebookTabs,
  Speech,
  Users,
  PackageOpen,
  FileInput,
  School,
  UserRoundPen,
  LogOut,
} from "lucide-react";
import { NavObj } from "../types";

export const studentNavLists: NavObj[] = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    label: "dashboard",
    linkPath: "",
  },
  {
    id: 2,
    icon: <GraduationCap size={20} />,
    label: "academic",
    linkPath: "academic",
  },
  {
    id: 3,
    icon: <IndianRupee size={20} />,
    label: "tution fees",
    linkPath: "tution-fees",
  },
  {
    id: 4,
    icon: <NotebookTabs size={20} />,
    label: "notes",
    linkPath: "notes",
  },
  {
    id: 5,
    icon: <Speech size={20} />,
    label: "announcement",
    linkPath: "announcement",
  },
  {
    id: 6,
    icon: <Users size={20} />,
    label: "classroom",
    linkPath: "classroom",
  },
  {
    id: 7,
    icon: <PackageOpen size={20} />,
    label: "dropbox",
    linkPath: "dropbox",
  },
  {
    id: 8,
    icon: <FileInput size={20} />,
    label: "office",
    linkPath: "office",
  },
  {
    id: 9,
    icon: <School size={20} />,
    label: "collage",
    linkPath: "collage",
  },
  {
    id: 10,
    icon: <UserRoundPen size={20} />,
    label: "profile",
    linkPath: "profile",
  },
  { id: 11, icon: <LogOut size={20} />, label: "logout", linkPath: "logout" },
];
