import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassSchedule {
  classTitle: string;
  status: string;
  time: string;
  roomNo: string;
}

const ClassScheduleItem = ({
  classTitle,
  status,
  time,
  roomNo,
}: ClassSchedule) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-green-500";
      case "running":
        return "bg-yellow-500";
      case "finished":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <Card className="w-[250px] flex-shrink-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{classTitle}</CardTitle>
        <div className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium text-muted-foreground">{time}</div>
        <div className="font-bold">{roomNo}</div>
      </CardContent>
    </Card>
  );
};

// export
export default ClassScheduleItem;
