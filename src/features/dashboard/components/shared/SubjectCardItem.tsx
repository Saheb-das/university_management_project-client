type SubjectCardType = {
  subject: string;
  classTime: string;
  classDate: string;
  classStatus: string;
};

function SubjectCardItem({
  subject,
  classTime,
  classStatus,
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
          classStatus
        )}`}
      ></div>

      {/* Class Time & Date */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-muted-foreground font-medium text-sm">{classTime}</p>
        <p className="text-muted-foreground font-medium text-sm">{classDate}</p>
      </div>
    </div>
  );
}

// export
export default SubjectCardItem;
