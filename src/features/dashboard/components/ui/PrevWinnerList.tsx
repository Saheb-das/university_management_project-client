// external import
import { Trophy } from "lucide-react";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IToppers {
  counsellorId: string;
  name: string;
  totalAdmissions: number;
  totalCommission: string;
}

interface Props {
  data: IToppers[];
}

function PrevWinnerList({ data }: Props) {
  if (data.length === 0) {
    return <p>there are no data yet</p>;
  }

  const winners = [...data]
    .sort((a, b) => b.totalAdmissions - a.totalAdmissions) // descending
    .map((topper, index) => ({
      rank: index + 1,
      name: topper.name,
      admissions: topper.totalAdmissions,
      commission: Number(topper.totalCommission),
    }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {winners.length > 0 &&
        winners.map((winner) => (
          <Card key={winner.rank} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {winner.rank === 1 ? "🥇" : winner.rank === 2 ? "🥈" : "🥉"}{" "}
                {winner.rank}
                {getOrdinal(winner.rank)} Place
              </CardTitle>
              <Trophy
                className={`h-4 w-4 ${
                  winner.rank === 1
                    ? "text-yellow-500"
                    : winner.rank === 2
                    ? "text-gray-400"
                    : "text-orange-600"
                }`}
              />
            </CardHeader>
            <CardContent className="flex flex-col justify-center flex-grow">
              <p className="text-lg font-bold mb-2">{winner.name}</p>
              <p className="text-sm text-muted-foreground">
                Admissions:{" "}
                <span className="font-medium">{winner.admissions}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Commission:{" "}
                <span className="font-medium">
                  ${winner.commission.toLocaleString()}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

// export
export default PrevWinnerList;

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
