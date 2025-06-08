// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProjectCardItem from "../shared/ProjectCardItem";
import { useRecoilValue } from "recoil";
import { myProjectsAtom } from "../../recoil/student/dashboardAtom";
import { convertFilePathUrl } from "@/utils/convertPath";

function ProjectsCard() {
  const projectsInfo = useRecoilValue(myProjectsAtom);

  return (
    <ScrollArea>
      <div className=" flex w-max space-x-4  p-4 ">
        {projectsInfo && projectsInfo.length > 0 ? (
          projectsInfo.map((item) => (
            <ProjectCardItem
              key={item.id}
              projectTitle={item.title}
              imgPath={item.avatat ? convertFilePathUrl(item.avatat) : ""}
              link={item.projectUrl}
              projectDate={String(item.date)}
            />
          ))
        ) : (
          <p className="text-lg font-semibold font-mono">
            There are not projects yet !
          </p>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

// export
export default ProjectsCard;
