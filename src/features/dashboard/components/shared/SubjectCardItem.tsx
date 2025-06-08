type SubjectCardType = {
  subject: string;
  startTime: string;
  endTime: string;
  classDate: string;
};

function getStatusFromTime(
  startTime: string,
  endTime: string
): "pending" | "running" | "completed" {
  const now = new Date();

  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const startDate = new Date(now);
  startDate.setHours(startHour, startMin, 0, 0);

  const endDate = new Date(now);
  endDate.setHours(endHour, endMin, 0, 0);

  if (now < startDate) return "pending";
  if (now >= startDate && now <= endDate) return "running";
  return "completed";
}

function SubjectCardItem({
  subject,
  startTime,
  endTime,

  classDate,
}: SubjectCardType) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-green-500";
      case "running":
        return "bg-yellow-500";
      case "completed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-background relative w-72 px-4 py-4 rounded-lg shadow-md transition-all hover:shadow-lg list-view-card">
      {/* Subject Title */}
      <h3 className="capitalize font-semibold text-lg text-secondary-foreground">
        {subject}
      </h3>

      {/* Status Indicator */}
      <div
        className={`absolute top-4 right-3 w-4 h-4 border-2 border-white rounded-full ${getStatusColor(
          getStatusFromTime(startTime, endTime)
        )}`}
      ></div>

      {/* Class Time & Date */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-muted-foreground font-medium text-sm">
          {startTime} - {endTime}
        </p>
        <p className="text-muted-foreground font-medium text-sm">{classDate}</p>
      </div>
    </div>
  );
}

// export
export default SubjectCardItem;
