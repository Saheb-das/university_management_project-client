// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlockInfo from "../shared/BlockInfo";
import InlineInfo from "../shared/InlineInfo";
import { courseInfoAtom } from "../../recoil/tutionFeeAtom";
import { useCourseById } from "../../hooks/useCourseById";
import { calculateLateFine, getPaymentLastDate } from "@/utils/calc";
import { useCreatePayOrder } from "../../../../hooks/useCreatePayOrder";
import { useVerifyPayOrder } from "../../../../hooks/useVerifyPayOrder";
import { toast } from "sonner";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { myAllTransactionAtom } from "@/features/transactions/recoil/transaction";
import { getlatestSemNo } from "../../utils/util";
import queryClient from "@/react-query/client";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";

// types import
import {
  RazorpayOptions,
  RazorpayOrder,
  RazorpayPaymentResponse,
} from "@/types/razorpay";
import { ICreateTransBody } from "@/features/transactions/types/transaction";

const lateCharge = 100;

interface Props {
  courseId: string;
}

const CurrPayStatus = ({ courseId }: Props) => {
  const payHisInfo = useRecoilValue(myAllTransactionAtom);
  const [loading, setLoading] = useState(false);
  const basicUserInfo = useRecoilValue(userBasicAtom);
  const courseInfo = useRecoilValue(courseInfoAtom);
  useCourseById(courseId);

  let latestSemNo = getlatestSemNo(payHisInfo);

  const semAmount =
    courseInfo && Number(courseInfo.courseFees) / courseInfo.numberOfSem;

  const lateFineObj = calculateLateFine(
    latestSemNo % 2 ? "even" : "odd",
    lateCharge
  );
  const lastDate = getPaymentLastDate(
    latestSemNo % 2 ? "even" : "odd"
  ).toLocaleDateString("en-GB");

  const curStatus = [
    { label: "Last Date", value: lastDate },
    { label: "Amount", value: `₹${semAmount || 0.0}` },
    { label: "Late Fine", value: `₹${lateFineObj.fine || 0.0}` },
    {
      label: "Total Amount",
      value: `₹${semAmount || 0 + lateFineObj.fine || 0}`,
    },
  ];

  const { mutateAsync: createOrderAsync } = useCreatePayOrder();
  const { mutateAsync: verifyOrderAsync } = useVerifyPayOrder();
  const { mutateAsync: createTransAsync } = useCreateTransaction();

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await createOrderAsync({
        amount: `${(semAmount + lateFineObj.fine) * 100}`,
      });
      if (!res) return;

      const order: RazorpayOrder = res.order;

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "College Management",
        description: "Semester Fee Payment",
        order_id: order.id,
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            const verifyPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyRes = await verifyOrderAsync(verifyPayload);

            if (verifyRes?.isVerified) {
              toast.success("✅ Payment successful!");

              const createdAt = new Date(order.created_at * 1000);
              const formattedDate = createdAt.toISOString().split("T")[0]; // "YYYY-MM-DD"
              const formattedTime = createdAt.toTimeString().slice(0, 5); // "HH:MM"

              // ✅ Create transaction here
              const transPayload: ICreateTransBody = {
                transData: {
                  trans: {
                    amount: String(order.amount),
                    date: formattedDate,
                    time: formattedTime,
                    mode: "inapp",
                    type: "tutionFee",
                    userRole: basicUserInfo?.role!,
                    utr: response.razorpay_payment_id,
                  },
                  razor: verifyPayload,
                  tutionFee: {
                    lateFine: String(lateFineObj.fine),
                    semNo: latestSemNo,
                    semFees: String(semAmount),
                    totalAmount: String(semAmount + lateFineObj.fine),
                  },
                },
                isSalary: false,
                userId: basicUserInfo?.id!,
              };

              await createTransAsync(transPayload);

              queryClient.invalidateQueries({
                queryKey: ["transactions-me"],
              });
            } else {
              toast.error("❌ Payment verification failed");
            }
          } catch (error) {
            console.error("Verification failed", error);
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: basicUserInfo?.name!,
          email: basicUserInfo?.email!,
        },
        theme: { color: "#173b8f" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error creating Razorpay order", error);
      toast.error("❌ Failed to create Razorpay order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className=" p-5 bg-background shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-primary font-semibold text-xl capitalize">
          Current Payment Status
          <span className="text-blue-600 font-bold">
            {courseInfo && courseInfo.numberOfSem < latestSemNo
              ? "All Completed"
              : `  (sem - ${latestSemNo})`}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {courseInfo && courseInfo.numberOfSem < latestSemNo ? (
          <p>There are no payment left. Thanks for complete all fees ✔ </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {curStatus &&
                curStatus.map((item, index) => (
                  <BlockInfo label={item.label} name={item.value} key={index} />
                ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <InlineInfo
                label={"late fine charge"}
                name={`₹${lateCharge}/day`}
              />
              <Button
                variant="default"
                className="capitalize  rounded-lg cursor-pointer"
                onClick={handlePayment}
              >
                {loading ? "Proccessing..." : "Pay fee"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrPayStatus;
