// external import
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";

// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { salariesTransAtom } from "../../recoil/salaryAtom";

const TransactionLists = () => {
  const { userRole, userId } = useParams();
  const navigate = useNavigate();
  const transactions = useRecoilValue(salariesTransAtom);

  const baseUrl = `/${userRole}/${userId}`;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Mode</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              onClick={() => navigate(`${baseUrl}/salary/${transaction.id}`)}
              className={`text-base cursor-pointer hover:bg-muted `}
            >
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{Number(transaction.amount) / 100}</TableCell>
              <TableCell>{transaction.mode}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-xl font-medium mt-6 capitalize ">
              there is no transactions
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

// export
export default TransactionLists;
