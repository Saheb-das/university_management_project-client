import Heading from "@/components/shared/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const transactionDetails = {
  id: 1,
  date: "2023-07-01",
  amount: 5000,
  status: "Paid",
};

const TransactionDetails = () => {
  // TODO: here fetched a single transaction with transactionId from url
  const [transaction, setTransaction] = useState(transactionDetails);
  const [loading, setLoading] = useState(true);
  const { transactionId } = useParams();

  // Fetch transaction details when selected
  // useEffect(() => {
  //   const fetchTransactionDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.example.com/salaries/${transactionId}`
  //       ); // Replace with your API
  //       const data = await response.json();
  //       setTransaction(data);
  //     } catch (error) {
  //       console.error("Error fetching transaction details:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTransactionDetails();
  // }, [transactionId]);

  // if (loading) return <p>Loading details...</p>;

  if (!transaction) return <p>No details found.</p>;

  return (
    <>
      <Heading title="transaction details" />

      <Card>
        <CardHeader>
          <CardTitle>Transaction #{transaction.id}</CardTitle>
          <CardDescription>Details of the selected transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">Date</dt>
              <dd>{transaction.date}</dd>
            </div>
            <div>
              <dt className="font-semibold">Amount</dt>
              <dd>${transaction.amount.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="font-semibold">Status</dt>
              <dd>{transaction.status}</dd>
            </div>
            <div>
              <dt className="font-semibold">Payment Method</dt>
              <dd>Direct Deposit</dd>
            </div>
            <div>
              <dt className="font-semibold">From</dt>
              <dd>acc-no: 4894820342034</dd>
            </div>
            <div>
              <dt className="font-semibold">To</dt>
              <dd>acc-no: 123220342034</dd>
            </div>
            <div>
              <dt className="font-semibold">Trasnaction Id</dt>
              <dd>83729123220342034</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-semibold">Description</dt>
              <dd>
                Monthly salary payment for the period ending {transaction.date}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </>
  );
};

// export
export default TransactionDetails;
