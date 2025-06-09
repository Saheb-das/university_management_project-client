// internal import
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { convertFilePathUrl } from "@/utils/convertPath";

interface INote {
  subName: string;
  title: string;
  docUrl: string;
  teacherBy: string;
}

const NoteItem = ({ subName, title, docUrl, teacherBy }: INote) => {
  return (
    <a
      href={docUrl ? convertFilePathUrl(docUrl) : ""}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="max-w-[360px] shadow-md hover:shadow-xl transition-shadow rounded-2xl bg-secondary text-secondary-foreground cursor-pointer border border-border">
        <CardContent className="p-5 space-y-3">
          <CardTitle className="text-xl font-semibold capitalize">
            {subName}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-secondary-foreground">
              Module:
            </span>{" "}
            {title}
          </p>

          <div className="pt-3 border-t border-muted">
            <p className="text-sm text-secondary-foreground">
              <span className="font-medium text-foreground">Instructor:</span>{" "}
              {teacherBy}
            </p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

// export
export default NoteItem;
