// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecoilValue } from "recoil";
import { isoToLocalDateFormat } from "@/utils/convertStr";
import { allTransactionsSelector } from "../../recoil/transactionSelector";

const TransactionList = ({ utr }: { utr: string }) => {
  const transactions = useRecoilValue(allTransactionsSelector(utr));
  return (
    <div className="bg-background text-foreground rounded-lg p-3">
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Id</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>UTR No</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions ? (
              transactions.map((item) => (
                <TableRow className="text-base" key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{Number(item.amount) / 100}</TableCell>
                  <TableCell>{isoToLocalDateFormat(item.date)}</TableCell>
                  <TableCell>{item.utr}</TableCell>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="font-semibold font-mono">
                  There are no such transactions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionList;
