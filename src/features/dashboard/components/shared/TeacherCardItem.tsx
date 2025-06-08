// external import
import { convertFilePathUrl } from "@/utils/convertPath";
import { CircleUserRound, MailOpen } from "lucide-react";

type TeacherCardType = {
  teacherName: string;
  subject: string;
  imgPath: string;
  mailLink: string;
};

function TeacherCardItem({
  teacherName,
  subject,
  imgPath,
  mailLink,
}: TeacherCardType) {
  return (
    <div className="w-72 max-w-md py-4 px-4 bg-background flex justify-between rounded-lg items-center shadow-md hover:shadow-lg transition-all">
      {/* Profile Image */}
      <div className="p-2 bg-secondary rounded-full w-14 h-14 flex items-center justify-center overflow-hidden">
        {imgPath ? (
          <img
            src={convertFilePathUrl(imgPath)}
            alt="profile picture"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <CircleUserRound className="w-10 h-10 text-muted-foreground" />
        )}
      </div>

      {/* Name and Subject Details */}
      <div className="flex-1 px-4">
        <h2 className="text-lg text-secondary-foreground font-semibold">
          {teacherName}
        </h2>
        <p className="text-sm text-muted-foreground">{subject}</p>
      </div>

      {/* Mailbox Icon */}
      <div className="p-2 rounded-full hover:bg-background transition-all">
        <a href={`mailto:${mailLink}`}>
          <MailOpen className="text-primary w-6 h-6" />
        </a>
      </div>
    </div>
  );
}

// export
export default TeacherCardItem;
