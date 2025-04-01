import {
  LayoutDashboard,
  NotebookTabs,
  BookA,
  IndianRupee,
  Speech,
  Users,
  Award,
  PackageOpen,
  FileInput,
  School,
  UserRoundPen,
  LogOut,
} from "lucide-react";
import { NavObj } from "../types";

export const teacherNavLists: NavObj[] = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    label: "dashboard",
    linkPath: "",
  },
  {
    id: 2,
    icon: <NotebookTabs size={20} />,
    label: "studyroom",
    linkPath: "studyroom",
  },
  {
    id: 3,
    icon: <BookA size={20} />,
    label: "attendance",
    linkPath: "attendance",
  },
  {
    id: 4,
    icon: <IndianRupee size={20} />,
    label: "salary",
    linkPath: "salary",
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
    label: "classgroup",
    linkPath: "classgroup",
  },
  {
    id: 7,
    icon: <Award size={20} />,
    label: "community",
    linkPath: "community",
  },
  {
    id: 8,
    icon: <PackageOpen size={20} />,
    label: "dropbox",
    linkPath: "dropbox",
  },
  {
    id: 9,
    icon: <FileInput size={20} />,
    label: "office",
    linkPath: "office",
  },
  {
    id: 10,
    icon: <School size={20} />,
    label: "collage",
    linkPath: "collage",
  },
  {
    id: 11,
    icon: <UserRoundPen size={20} />,
    label: "profile",
    linkPath: "profile",
  },
  { id: 12, icon: <LogOut size={20} />, label: "logout", linkPath: "logout" },
];
