import {
  FileInput,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  PackageOpen,
  School,
  ScrollText,
  ShieldCheck,
  Speech,
  UserRoundPen,
  Users,
} from "lucide-react";
import { NavObj } from "../types";

export const accountantNavLists: NavObj[] = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    label: "dashboard",
    linkPath: "",
  },
  {
    id: 2,
    icon: <ShieldCheck size={20} />,
    label: "check fees",
    linkPath: "check-fees",
  },
  {
    id: 3,
    icon: <IndianRupee size={20} />,
    label: "salary",
    linkPath: "salary",
  },
  {
    id: 4,
    icon: <ScrollText size={20} />,
    label: "transactions",
    linkPath: "transactions",
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
    label: "community",
    linkPath: "community",
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
