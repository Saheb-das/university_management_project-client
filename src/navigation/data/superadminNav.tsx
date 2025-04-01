import {
  LayoutDashboard,
  IndianRupee,
  Speech,
  PersonStanding,
  University,
  School,
  UserRoundPen,
  LogOut,
} from "lucide-react";
import { NavObj } from "../types";

export const superadminNavLists: NavObj[] = [
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
    icon: <PersonStanding size={20} />,
    label: "admin",
    linkPath: "admin",
  },
  {
    id: 5,
    icon: <University size={20} />,
    label: "department",
    linkPath: "department",
  },
  {
    id: 6,
    icon: <School size={20} />,
    label: "collage",
    linkPath: "collage",
  },
  {
    id: 7,
    icon: <UserRoundPen size={20} />,
    label: "profile",
    linkPath: "profile",
  },
  { id: 8, icon: <LogOut size={20} />, label: "logout", linkPath: "logout" },
];
