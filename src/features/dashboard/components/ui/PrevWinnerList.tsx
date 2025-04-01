import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const winners = [
  { rank: 1, name: "John Doe", admissions: 150, commission: 75000 },
  { rank: 2, name: "Jane Smith", admissions: 130, commission: 65000 },
  { rank: 3, name: "Bob Johnson", admissions: 110, commission: 55000 },
];

function PrevWinnerList() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {winners.map((winner) => (
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
