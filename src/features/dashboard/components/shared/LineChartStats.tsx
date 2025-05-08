// external import
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import { ErrorBoundary } from "react-error-boundary";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartProps<T> {
  title: string;
  data: T[];
  xKey: keyof T; // Dynamic X-axis key
  children: React.ReactNode; // Allow lines via children
}

function LineChartStats<T>({ title, data, xKey, children }: ChartProps<T>) {
  return (
    <ErrorBoundary
      fallback={
        <>
          <p>maybe something wrong</p>
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey as string} />
              <YAxis />
              <Tooltip />
              <Legend />
              {children} {/* Render lines passed as children */}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}

export default LineChartStats;
