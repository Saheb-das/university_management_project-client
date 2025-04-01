import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps<T> {
  title: string;
  desc?: string;
  data: T[];
  xKey: keyof T; // Dynamic X-axis key
  children: React.ReactNode; // Allow bars via children
}

function BarChartStats<T>({
  title,
  desc,
  data,
  xKey,
  children,
}: ChartProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg capitalize">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey as string} />
            <YAxis />
            <Tooltip />
            <Legend />
            {children} {/* Render bars passed as children */}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default BarChartStats;
