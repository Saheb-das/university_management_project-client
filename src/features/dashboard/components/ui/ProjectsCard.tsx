// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProjectCardItem from "../shared/ProjectCardItem";

const projectLists = [
  {
    id: 1,
    projectTitle: "doctor app",
    desc: "Lorem ",
    imgPath: "",
    link: "",
    projectDate: "12.04.21",
  },
  {
    id: 2,
    projectTitle: "doctor app",
    desc: "Lorem ",
    imgPath: "",
    link: "",
    projectDate: "12.04.21",
  },
  {
    id: 3,
    projectTitle: "doctor app",
    desc: "Lorem ",
    imgPath: "",
    link: "",
    projectDate: "12.04.21",
  },
  {
    id: 4,
    projectTitle: "doctor app",
    desc: "Lorem ",
    imgPath: "",
    link: "",
    projectDate: "12.04.21",
  },
  {
    id: 5,
    projectTitle: "doctor app",
    desc: "Lorem ",
    imgPath: "",
    link: "",
    projectDate: "12.04.21",
  },
];

function ProjectsCard() {
  return (
    <ScrollArea>
      <div className=" flex w-max space-x-4  p-4 ">
        {projectLists.map(
          ({ id, projectDate, projectTitle, desc, imgPath, link }) => (
            <ProjectCardItem
              key={id}
              projectTitle={projectTitle}
              desc={desc}
              imgPath={imgPath}
              link={link}
              projectDate={projectDate}
            />
          )
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

// export
export default ProjectsCard;
