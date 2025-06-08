import { CircleChevronRight } from "lucide-react";
import { Link } from "react-router";
type ProjectCardType = {
  imgPath: string;

  link: string;
  projectDate: string;
  projectTitle: string;
};

function ProjectCardItem({
  imgPath,

  link,
  projectDate,
  projectTitle,
}: ProjectCardType) {
  return (
    <div className="p-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-all w-[220px]">
      {/* Project Image */}
      <div className="w-full h-[90px] bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
        <img
          className="w-auto h-auto max-h-[60px] object-contain"
          src={imgPath}
          alt={projectTitle}
        />
      </div>

      {/* Project Title */}
      <h3 className="mt-4 mb-2 font-semibold text-lg text-secondary-foreground">
        {projectTitle}
      </h3>

      {/* Date & Link */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <p className="text-muted-foreground">{projectDate}</p>
        <Link to={link} className="text-primary hover:text-teal-500 transition">
          <CircleChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

// export
export default ProjectCardItem;
