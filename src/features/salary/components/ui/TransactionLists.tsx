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
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{transaction.mode}</TableCell>
            </TableRow>
          ))
        ) : (
          <h1 className="text-xl font-medium mt-6 capitalize ">
            there is no transactions
          </h1>
        )}
      </TableBody>
    </Table>
  );
};

// export
export default TransactionLists;
