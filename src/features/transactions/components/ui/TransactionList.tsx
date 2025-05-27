// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITransaction } from "../../pages/Transactions";

interface IList {
  transactions: ITransaction[];
}

const TransactionList = ({ transactions }: IList) => {
  return (
    <div className="bg-background text-foreground rounded-lg p-3">
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>UTR No</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow className="text-base" key={transaction.id}>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.time}</TableCell>
                <TableCell>{transaction.utrNo}</TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionList;
