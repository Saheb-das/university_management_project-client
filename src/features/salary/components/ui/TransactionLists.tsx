import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router";

const transactions = [
  { id: 1, date: "2023-07-01", amount: 5000, status: "Paid" },
  { id: 2, date: "2023-06-01", amount: 5000, status: "Paid" },
  { id: 3, date: "2023-05-01", amount: 4800, status: "Paid" },
  { id: 4, date: "2023-04-01", amount: 4800, status: "Paid" },
  { id: 5, date: "2023-03-01", amount: 4800, status: "Paid" },
];

const TransactionLists = () => {
  const { userRole, userId } = useParams();
  const baseUrl = `/${userRole}/${userId}`;
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions ? (
          transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              onClick={() => navigate(`${baseUrl}/salary/${transaction.id}`)}
              className={`text-base cursor-pointer hover:bg-muted `}
            >
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.status}</TableCell>
            </TableRow>
          ))
        ) : (
          <h1 className="text-xl font-medium">there is no transactions</h1>
        )}
      </TableBody>
    </Table>
  );
};

// export
export default TransactionLists;
