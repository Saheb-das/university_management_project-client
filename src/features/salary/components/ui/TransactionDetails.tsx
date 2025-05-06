// external import
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";

// internal import
import Heading from "@/components/shared/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseQueryResult } from "@tanstack/react-query";

// types import
import { TTranRes } from "@/types/transaction";

interface ITransDetails {
  getTransactionById: (
    id: string
  ) => Promise<UseQueryResult<TTranRes | null, Error>>;
}

const TransactionDetails = async () => {
  const [transaction, setTransaction] = useState<TTranRes | null>();
  const [error, setError] = useState<boolean>();
  const [loaading, setLoading] = useState<boolean>();
  const { transactionId } = useParams();
  const { getTransactionById } = useOutletContext<ITransDetails>();

  useEffect(() => {
    const getTrans = async () => {
      if (transactionId) {
        const { data, isError, isLoading, isSuccess } =
          await getTransactionById(transactionId);
        setError(isError);
        setLoading(isLoading);

        if (isSuccess) {
          setTransaction(data);
        }
      }
    };

    getTrans();
  }, [transactionId]);

  return (
    <>
      <Heading title="transaction details" />
      {loaading && <p>Loading ...</p>}
      {error && <p>something went wrong</p>}
      {transaction && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction #{transaction.id}</CardTitle>
            <CardDescription>
              Details of the selected transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-semibold">Date</dt>
                <dd>{transaction.date}</dd>
              </div>
              <div>
                <dt className="font-semibold">Amount</dt>
                <dd>${transaction.amount}</dd>
              </div>
              <div>
                <dt className="font-semibold">Type</dt>
                <dd>{transaction.type}</dd>
              </div>
              <div>
                <dt className="font-semibold">Payment Method</dt>
                <dd>{transaction.mode}</dd>
              </div>
              <div>
                <dt className="font-semibold">From</dt>
                <dd>
                  acc-no: {transaction.salary?.sender.bankAccount.accountNo}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">To</dt>
                <dd>
                  acc-no: {transaction.salary?.reciever.bankAccount.accountNo}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Trasnaction Id</dt>
                <dd>{transaction.utr}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-semibold">Description</dt>
                <dd>
                  Monthly salary payment for the period ending{" "}
                  {transaction.date}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </>
  );
};

// export
export default TransactionDetails;
