import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { year: 2018, commission: 25000 },
  { year: 2019, commission: 32000 },
  { year: 2020, commission: 38000 },
  { year: 2021, commission: 42000 },
  { year: 2022, commission: 48000 },
  { year: 2023, commission: 54000 },
];

function CommissionChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="year"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Bar dataKey="commission" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// export
export default CommissionChart;
