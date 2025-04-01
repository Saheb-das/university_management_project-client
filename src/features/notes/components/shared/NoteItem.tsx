// internal import
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface INote {
  subjectName: string;
  subjectImg: string;
  modeleDesc: string;
  teacherBy: string;
}

const NoteItem = ({
  subjectName,
  subjectImg,
  modeleDesc,
  teacherBy,
}: INote) => {
  return (
    <Card className="max-w-[360px] shadow-xl cursor-pointer rounded-lg overflow-hidden  bg-secondary text-secondary-foreground">
      {/* Image Section */}
      <CardHeader className="p-0">
        <div className="w-full h-[160px] bg-background flex items-center justify-center overflow-hidden">
          <img
            src={subjectImg}
            alt={subjectName}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>

      {/* Title Section */}
      <CardContent>
        <CardTitle className="text-lg font-semibold text-secondary-foreground capitalize">
          {subjectName}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          <span className="font-medium text-secondary-foreground">Module:</span>{" "}
          {modeleDesc}
        </p>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="p-4  bg-background">
        <p className="text-sm text-secondary-foreground">
          <span className="font-medium text-foreground">Instructor:</span>{" "}
          {teacherBy}
        </p>
      </CardFooter>
    </Card>
  );
};

// export
export default NoteItem;
