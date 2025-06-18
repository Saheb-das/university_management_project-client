// external import
import { useState } from "react";
import { Calendar, CreditCard, IndianRupee } from "lucide-react";

// internal import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePayOrder } from "@/hooks/useCreatePayOrder";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { useVerifyPayOrder } from "@/hooks/useVerifyPayOrder";
import { RazorpayOrder } from "@/types/razorpay";
import { toast } from "sonner";
import { ICreateTransBody } from "@/features/transactions/types/transaction";
import { IUserProfile } from "@/features/stuff/types/stuff";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  stuff: IUserProfile;
}

const SalaryPayForm = ({ stuff }: Props) => {
  const [payInfo, setPayInfo] = useState({
    month: "",
    salary: "",
    bonus: "",
  });
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createOrderAsync } = useCreatePayOrder();
  const { mutateAsync: verifyOrderAsync } = useVerifyPayOrder();
  const { mutateAsync: createTransAsync } = useCreateTransaction();

  const handlePay = async () => {
    setLoading(true);

    try {
      const res = await createOrderAsync({
        amount: `${
          (Number(payInfo.salary) + Number(payInfo.bonus || 0)) * 100
        }`,
      });
      if (!res) return;

      const order: RazorpayOrder = res.order;

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "College Management",
        description: "Salary Payment",
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
                    type: "salary",
                    userRole: stuff.role,
                    utr: response.razorpay_payment_id,
                  },
                  razor: verifyPayload,
                  salary: {
                    inMonth: payInfo.month.toLowerCase(),
                    performanceBonus: payInfo.bonus || "0",
                    salaryAmount: payInfo.salary,
                    totalAmount: `${
                      Number(payInfo.salary) + Number(payInfo.bonus)
                    }`,
                  },
                },
                isSalary: true,
                userId: stuff.id,
              };

              await createTransAsync(transPayload);
            } else {
              toast.error("❌ Payment verification failed");
            }
          } catch (error) {
            console.error("Verification failed", error);
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: `${stuff.firstName} ${stuff.lastName}`,
          email: stuff.email,
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
      setPayInfo({
        month: "",
        salary: "",
        bonus: "",
      });
    }
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Details</h3>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-2">
          <Label htmlFor="month" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Select Month
          </Label>
          <Select
            value={payInfo.month}
            onValueChange={(m) => setPayInfo((p) => ({ ...p, month: m }))}
          >
            <SelectTrigger id="month">
              <SelectValue placeholder="Choose month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary" className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            Salary Amount
          </Label>
          <Input
            id="salary"
            type="text"
            placeholder="Enter salary amount"
            value={payInfo.salary}
            onChange={(e) =>
              setPayInfo((p) => ({ ...p, salary: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bonus" className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            Performance Bonus
          </Label>
          <Input
            id="bonus"
            type="text"
            placeholder="Enter performance bonus amount"
            value={payInfo.bonus}
            onChange={(e) =>
              setPayInfo((p) => ({ ...p, bonus: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handlePay}
          disabled={!payInfo.salary || !payInfo.month}
          className="w-full md:w-auto cursor-pointer"
          size="lg"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          {loading ? "proccessing..." : "Pay Salary"}
        </Button>
      </div>
    </div>
  );
};

export default SalaryPayForm;
