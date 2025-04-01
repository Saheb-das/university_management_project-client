// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITuitionTransaction } from "../../pages/CheckTutionFees";

interface IVerify {
  name: string;
  transaction: ITuitionTransaction;
  handleStatus: (status: ITuitionTransaction["status"]) => void;
}

const VerifyCard = ({ name, transaction, handleStatus }: IVerify) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tuition Fee Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="border p-4 rounded-md">
          <p>
            <strong>UTR No:</strong> {transaction.utrNo}
          </p>
          <p>
            <strong>Semester:</strong> {transaction.semester}
          </p>
          <p>
            <strong>Amount:</strong> ₹{transaction.amount}
          </p>
          <p>
            <strong>Date:</strong> {transaction.date}
          </p>
          <div className="mt-2">
            <Button
              variant={
                transaction.status === "verified" ? "default" : "outline"
              }
              className="mr-2"
              onClick={() => handleStatus("verified")}
            >
              Verified
            </Button>
            <Button
              variant={
                transaction.status === "checking" ? "default" : "outline"
              }
              onClick={() => handleStatus("checking")}
            >
              Checking
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyCard;
