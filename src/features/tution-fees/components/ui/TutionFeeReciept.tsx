import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/shared/Container";
import { useRecoilValue } from "recoil";
import { recieptTransactionDetailsAtom } from "../../recoil/tutionFeeAtom";
import { collageAtom } from "@/features/collage/recoil/collageAtom";
import { convertFilePathUrl } from "@/utils/convertPath";
import RecieptRow from "../shared/RecieptRow";
import { studentDetailsAtom } from "@/features/student/recoil/studentAtom";
import { studentUserAtom } from "@/features/dashboard/recoil/student/dashboardAtom";
import { capitalizeStr, formatShortDate } from "@/utils/convertStr";

function modifySemName(semNo: number) {
  if (semNo === 1) {
    return `${semNo}st`;
  } else if (semNo === 2) {
    return `${semNo}nd`;
  } else if (semNo === 3) {
    return `${semNo}rd`;
  } else {
    return `${semNo}th`;
  }
}

const TuitionFeeReceipt: React.FC = () => {
  const recieptInfo = useRecoilValue(recieptTransactionDetailsAtom);
  const collageInfo = useRecoilValue(collageAtom);
  const studentInfo = useRecoilValue(studentUserAtom);
  return (
    <Container>
      <div className="flex flex-col items-center py-10">
        <Card className="max-w-lg w-full mx-auto p-6 bg-white text-foreground shadow-xl rounded-2xl border border-gray-200 relative z-10">
          <CardHeader className="text-center">
            <img
              src={
                collageInfo?.avatar
                  ? convertFilePathUrl(collageInfo.avatar)
                  : ""
              }
              alt="College Logo"
              className="mx-auto w-20 h-20 bg-secondary rounded-full mb-4 border-2 border-muted"
            />
            <p className="text-muted-foreground text-sm mb-2 capitalize">
              {collageInfo?.address}
            </p>
            <CardTitle className="text-primary font-bold text-3xl">
              Payment Reciept
            </CardTitle>
          </CardHeader>

          <CardContent className="relative text-base pt-8">
            {/* Background watermark */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[280px] text-center text-muted-foreground text-5xl font-extrabold opacity-30 -rotate-45 pointer-events-none select-none capitalize">
              {collageInfo?.name}
            </div>

            <table className="w-full border-collapse text-left z-10 relative">
              <tbody className="divide-y divide-gray-300">
                {/* <RecieptRow label="" value={"32322"} /> */}
                <RecieptRow
                  label="Student Name"
                  value={capitalizeStr(
                    `${studentInfo.profile.user.firstName} ${studentInfo.profile.user.lastName}`
                  )}
                />
                <RecieptRow
                  label="Course"
                  value={capitalizeStr(studentInfo.course.name)}
                />
                <RecieptRow
                  label="Semester"
                  value={`${modifySemName(
                    recieptInfo.tutionFee?.semNo!
                  )} Semester`}
                />
                <RecieptRow
                  label="Payment Date"
                  value={`${formatShortDate(recieptInfo.date)}`}
                />
                <RecieptRow
                  label="Transaction ID"
                  value={`${recieptInfo.id}`}
                />
                <RecieptRow
                  label="Late Fine"
                  value={`${recieptInfo.tutionFee?.lateFine}`}
                />
                <RecieptRow
                  label="Amount Paid"
                  value={`${Number(recieptInfo.amount) / 100}`}
                />
                <RecieptRow
                  label="Payment Method"
                  value={`${recieptInfo.mode}`}
                />
                <RecieptRow
                  label="Reference UTR"
                  value={`${recieptInfo.utr}`}
                />
              </tbody>
            </table>

            <div className="mt-6 text-center text-muted-foreground text-sm">
              <p>Thank you for your payment!</p>
              <p className="italic">Keep this receipt for your records.</p>
            </div>

            <div className="mt-8 capitalize text-right text-sm font-medium text-secondary-foreground">
              Approved by{" "}
              <span className="font-bold ">
                {capitalizeStr(collageInfo?.name)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button
          variant="default"
          className="mt-6 px-6 py-3 text-lg cursor-pointer rounded-xl shadow-md hover:bg-primary/90 transition duration-300"
        >
          Download Receipt
        </Button>
      </div>
    </Container>
  );
};

export default TuitionFeeReceipt;
