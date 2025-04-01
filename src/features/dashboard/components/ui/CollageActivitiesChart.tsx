import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Colors for each segment
const COLORS = [
  "#0088FE", // Blue
  "#00C49F", // Green
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#A020F0", // Purple
];

interface CollageActivities {
  name: string;
  value: number;
}

const CollageActivitiesChart = ({
  activitiesData,
}: {
  activitiesData: CollageActivities[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium">
          College Activities Distribution
        </CardTitle>
        <CardDescription>collage other activities </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="text-sm">
            <Pie
              data={activitiesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(entry) => `${entry.name} (${entry.value}%)`}
            >
              {activitiesData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// export
export default CollageActivitiesChart;
