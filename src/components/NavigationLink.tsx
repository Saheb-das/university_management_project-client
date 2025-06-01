// external import
import { NavLink, useNavigate } from "react-router";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { removeStorage } from "@/utils/localStorage";

interface NavIcon {
  icon: React.ReactNode;
  label: string;
  linkPath: string;
  baseUrl: string;
}

function NavigationLink({ icon, label, linkPath, baseUrl }: NavIcon) {
  const navigate = useNavigate();
  const navigationTo = linkPath === "" ? baseUrl : `${baseUrl}/${linkPath}`;

  const logout = () => {
    console.log("linkpath", linkPath);
    removeStorage("auth_token");
    removeStorage("basicUser");
    navigate("/");
  };

  const isLogout = label.toLowerCase() === "logout";
  return (
    <>
      {isLogout ? (
        <>
          <div
            className="flex gap-2 px-1 lg:px-3 py-[8px] rounded group cursor-pointer"
            onClick={logout}
          >
            <SidebarMenuItem key={label} className="w-full">
              <SidebarMenuButton asChild>
                <div className="flex gap-1">
                  <div className="p-1 rounded-lg group-hover:bg-primary-foreground group-hover:text-primary">
                    {icon}
                  </div>
                  <span className="text-[17px] font-medium hidden lg:block text-foreground group-hover:text-primary">
                    {label}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
        </>
      ) : (
        <>
          <NavLink
            end
            className={`flex gap-2 px-1 lg:px-3 py-[8px] rounded group`}
            to={label !== "logout" ? navigationTo : ""}
          >
            {/* icon */}
            {({ isActive }) => (
              <>
                <SidebarMenuItem key={label} className="w-full">
                  <SidebarMenuButton asChild>
                    <div
                      className="flex gap-1"
                      onClick={label === "logout" ? logout : undefined}
                    >
                      <div
                        className={`p-1 rounded-lg ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "group-hover:bg-primary-foreground group-hover:text-primary"
                        }`}
                      >
                        {icon}
                      </div>
                      <span
                        className={`text-[17px] font-medium hidden lg:block ${
                          isActive
                            ? "text-primary"
                            : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </NavLink>
        </>
      )}
    </>
  );
}

export default NavigationLink;
