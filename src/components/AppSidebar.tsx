// external import
import { useParams } from "react-router";

// internal import
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "./ui/sidebar";
import {
  accountantNavLists,
  adminNavLists,
  counsellorNavLists,
  examcellerNavLists,
  studentNavLists,
  superadminNavLists,
  teacherNavLists,
} from "@/navigation";
import NavigationLink from "./NavigationLink";
import { Moon, Sun } from "lucide-react";
import { useMode } from "@/hooks/useMode";
import { useRecoilValue } from "recoil";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { convertFilePathUrl } from "@/utils/convertPath";

const AppSidebar = () => {
  const { darkMode, toggleMode } = useMode();
  const { userRole, userId } = useParams();
  const baseUrl = `${userRole}/${userId}`;

  const basicUser = useRecoilValue(userBasicAtom);

  let lists;
  let role = userRole?.slice(0, -1);
  if (role === "student") {
    lists = studentNavLists;
  } else if (role === "teacher") {
    lists = teacherNavLists;
  } else if (role === "counsellor") {
    lists = counsellorNavLists;
  } else if (role === "examceller") {
    lists = examcellerNavLists;
  } else if (role === "accountant") {
    lists = accountantNavLists;
  } else if (role === "admin") {
    lists = adminNavLists;
  } else if (role === "superadmin") {
    lists = superadminNavLists;
  } else {
    return [];
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col items-center justify-center pt-2">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                basicUser?.avatar ? convertFilePathUrl(basicUser.avatar) : ""
              }
              alt="Profile"
              className="w-18 h-18 rounded-full border-1 border-primary shadow-lg"
            />
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleMode}
            className="mt-4 p-1 rounded-lg shadow-md transition-all hover:bg-primary/10"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {lists.map((item) => (
                <NavigationLink
                  icon={item.icon}
                  label={item.label}
                  linkPath={item.linkPath}
                  baseUrl={baseUrl}
                  key={item.id}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
