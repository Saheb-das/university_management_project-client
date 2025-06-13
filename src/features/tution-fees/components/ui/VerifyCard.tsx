// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tutionFeeTransationByStudentAtom } from "../../recoil/tutionFeeAtom";
import { useVerifyFeeByTutionFeeId } from "../../hooks/useVerifyFeeByTutionFeeId";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IVerify {
  name: string;
  isError: boolean;
}

const VerifyCard = ({ name, isError }: IVerify) => {
  const [tranId, setTranId] = useState("");
  const feeTranInfo = useRecoilValue(tutionFeeTransationByStudentAtom);
  const { mutate, isPending } = useVerifyFeeByTutionFeeId(feeTranInfo?.id);

  const handleVerify = () => {
    mutate(
      { tranId: tranId },
      {
        onSuccess: (res) => {
          if (!res) return res;

          if (res.success) {
            toast.success(res.message || "verfied success");
          }
        },
        onError: (err) => {
          toast.error(err.message || "verify failed");
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tuition Fee Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        {!isError &&
        feeTranInfo &&
        Object.values(feeTranInfo).every((item) => item !== "") ? (
          <>
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <div className="border p-4 rounded-md">
              <p>
                <strong>UTR No:</strong> {feeTranInfo.transaction?.utr}
              </p>
              <p>
                <strong>Semester:</strong> {feeTranInfo.semNo}
              </p>
              <p>
                <strong>Amount:</strong> ₹{feeTranInfo.totalAmount}
              </p>
              <p>
                <strong>Date:</strong> {feeTranInfo.transaction?.date}
              </p>
              <div className="grid w-full max-w-sm items-center gap-1 mt-3 mb-5">
                <Label htmlFor="tranId" className="font-semibold text-lg">
                  Transaction Id
                </Label>
                <Input
                  type="text"
                  id="tranId"
                  placeholder="put transaction id"
                  value={tranId}
                  onChange={(e) => setTranId(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <Button
                  variant={feeTranInfo.isVerified ? "default" : "outline"}
                  className="mr-2"
                  onClick={handleVerify}
                >
                  {feeTranInfo.isVerified
                    ? "Verified"
                    : isPending
                    ? "Verifing..."
                    : "Verify"}
                </Button>
                <Button
                  variant={feeTranInfo.isVerified ? "default" : "outline"}
                >
                  Checking
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="font-semibold font-mono">There is no transactions !</p>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifyCard;
