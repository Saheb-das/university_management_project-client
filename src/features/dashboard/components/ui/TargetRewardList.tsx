import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const targetRewards = [
  { target: "50 Admissions", reward: "$2,000", progress: "80%" },
  { target: "100 Admissions", reward: "$5,000", progress: "45%" },
  { target: "$100,000 Commission", reward: "$10,000", progress: "60%" },
  { target: "10 International Students", reward: "$3,000", progress: "30%" },
  { target: "5 Scholarship Students", reward: "$2,500", progress: "100%" },
];

const TargetRewardList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Target</TableHead>
          <TableHead>Reward</TableHead>
          <TableHead>Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-base">
        {targetRewards.map((item) => (
          <TableRow key={item.target}>
            <TableCell className="font-medium">{item.target}</TableCell>
            <TableCell>{item.reward}</TableCell>
            <TableCell>{item.progress}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TargetRewardList;
