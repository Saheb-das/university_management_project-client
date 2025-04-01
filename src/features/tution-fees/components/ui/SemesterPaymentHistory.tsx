// external import
import { ReceiptIndianRupee } from "lucide-react";
import { Link } from "react-router";

// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const payHistoryData = [
  {
    id: 1,
    sem: "sem 1",
    date: "09/08/2021",
    upiId: "2365149874",
    amount: "28,000",
    lateFine: 0,
    isPaid: true,
  },
  {
    id: 2,
    sem: "sem 2",
    date: "12/04/2022",
    upiId: "2362583415",
    amount: "28,000",
    lateFine: 0,
    isPaid: true,
  },
  {
    id: 3,
    sem: "sem 3",
    date: "05/07/2022",
    upiId: "6523148721",
    amount: "28,000",
    lateFine: 200,
    isPaid: false,
  },
  {
    id: 4,
    sem: "sem 3",
    date: "05/07/2022",
    upiId: "6523148721",
    amount: "28,000",
    lateFine: 200,
    isPaid: false,
  },
];

const SemesterPaymentHistory = () => {
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
          {payHistoryData.map(
            ({ id, sem, date, upiId, amount, lateFine, isPaid }) => (
              <TableRow
                key={id}
                className="text-[15px] lg:text-base  text-foreground"
              >
                <TableCell className=" capitalize">{sem}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{upiId}</TableCell>
                <TableCell className="text-center">{lateFine}</TableCell>
                <TableCell className="">{amount}</TableCell>
                <TableCell
                  className={`${isPaid ? "text-green-600" : "text-red-600"}`}
                >
                  {isPaid ? "paid" : "pending"}
                </TableCell>
                <TableCell className=" text-center ">
                  <Link to={`reciept`}>
                    <ReceiptIndianRupee
                      className={`${
                        isPaid
                          ? "cursor-pointer"
                          : "cursor-not-allowed text-muted-foreground"
                      } `}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SemesterPaymentHistory;
