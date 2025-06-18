// external import
import { ReceiptIndianRupee } from "lucide-react";
import { Link } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";

// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { myAllTransactionAtom } from "@/features/transactions/recoil/transaction";
import { isoToLocalDateFormat } from "@/utils/convertStr";
import { Button } from "@/components/ui/button";
import { recieptTransactionDetailsAtom } from "../../recoil/tutionFeeAtom";

const SemesterPaymentHistory = () => {
  const payHistory = useRecoilValue(myAllTransactionAtom);
  const setReciept = useSetRecoilState(recieptTransactionDetailsAtom);
  return (
    <>
      <Table className="w-[780px] bg-background ">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="text-foreground text-base lg:text-lg capitalize">
            <TableHead className="">semester</TableHead>
            <TableHead>date</TableHead>
            <TableHead>UTR/UPI ID</TableHead>
            <TableHead>late fine</TableHead>
            <TableHead className="">amount</TableHead>
            <TableHead>status</TableHead>
            <TableHead>receipt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payHistory && payHistory.length > 0 ? (
            payHistory.map((item) => (
              <TableRow
                key={item.id}
                className="text-[15px] lg:text-base  text-foreground"
              >
                <TableCell className=" capitalize">
                  sem {item.tutionFee?.semNo}
                </TableCell>
                <TableCell>{isoToLocalDateFormat(item.date)}</TableCell>
                <TableCell>{item.utr}</TableCell>
                <TableCell className="text-center">
                  {item.tutionFee?.lateFine}
                </TableCell>
                <TableCell className="">{Number(item.amount) / 100}</TableCell>
                <TableCell
                  className={`${
                    item.tutionFee?.isVerified
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.tutionFee?.isVerified ? "verified" : "pending"}
                </TableCell>
                <TableCell className=" text-center ">
                  <Button
                    disabled={!item.tutionFee?.isVerified}
                    variant={"ghost"}
                    className="p-0"
                    onClick={() => setReciept(item)}
                  >
                    <Link to={`reciept`}>
                      <ReceiptIndianRupee
                        className={`${
                          item.tutionFee?.isVerified
                            ? "cursor-pointer"
                            : "cursor-not-allowed text-muted-foreground"
                        } `}
                      />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="font-semibold font-mono">
                Threre are no transactions yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SemesterPaymentHistory;
