// external import
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// internal import
import Heading from "@/components/shared/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// types import
import { IDetailedTran } from "@/types/transaction";
import { useTranByTranId } from "../../hooks/useTranByTranId";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState<IDetailedTran>(
    {} as IDetailedTran
  );
  const { transactionId } = useParams();
  const { data, isSuccess, isLoading, isError } = useTranByTranId(
    transactionId || "",
    "salary"
  );

  if (!transaction) return;

  useEffect(() => {
    if (isSuccess && data) {
      setTransaction(data.transaction);
    }
  }, [isSuccess, data]);

  return (
    <>
      <Heading title="transaction details" />
      {isLoading ? (
        <p>Loading ...</p>
      ) : isError ? (
        <p>something went wrong</p>
      ) : (
        transaction && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Transaction Summary
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Detailed summary of salary payment transaction
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <dl className="grid grid-cols-2  gap-4 text-sm">
                {/* Date */}
                <div>
                  <dt className="font-semibold text-muted-foreground">Date</dt>
                  <dd>
                    {new Date(transaction.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>

                {/* Month */}
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Salary Month
                  </dt>
                  <dd>
                    {new Date(transaction.date).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>

                {/* UTR  */}
                <div>
                  <dt className="font-semibold text-muted-foreground">UTR</dt>
                  <dd>{transaction.utr}</dd>
                </div>

                {/* Total Amount */}
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Total Amount
                  </dt>
                  <dd>₹{(Number(transaction.amount) / 100).toFixed(2)}</dd>
                </div>

                {/* Base Salary */}
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Salary Amount
                  </dt>
                  <dd>
                    ₹{Number(transaction.salary?.salaryAmount || 0).toFixed(2)}
                  </dd>
                </div>

                {/* Performance Bonus */}
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Performance Bonus
                  </dt>
                  <dd>
                    ₹
                    {Number(transaction.salary?.performanceBonus || 0).toFixed(
                      2
                    )}
                  </dd>
                </div>

                {/* Type */}
                <div>
                  <dt className="font-semibold text-muted-foreground">Type</dt>
                  <dd>{transaction.type}</dd>
                </div>

                {/* Payment Method */}
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Payment Method
                  </dt>
                  <dd>{transaction.mode}</dd>
                </div>

                {/* Sender Details */}
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Sender Name
                  </dt>
                  <dd>
                    {transaction.salary?.sender.bankAccount.accountHolderName}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Sender A/C No
                  </dt>
                  <dd>{transaction.salary?.sender.bankAccount.accountNo}</dd>
                </div>

                {/* Receiver Details */}
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Receiver Name
                  </dt>
                  <dd>
                    {transaction.salary?.reciever.bankAccount.accountHolderName}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted-foreground">
                    Receiver A/C No
                  </dt>
                  <dd>{transaction.salary?.reciever.bankAccount.accountNo}</dd>
                </div>
              </dl>

              {/* Description */}
              <div>
                <dt className="font-semibold text-muted-foreground mb-1">
                  Description
                </dt>
                <dd className="text-sm">
                  Monthly salary payment for the period ending{" "}
                  <span className="font-medium">
                    {new Date(transaction.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </dd>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </>
  );
};

// export
export default TransactionDetails;
