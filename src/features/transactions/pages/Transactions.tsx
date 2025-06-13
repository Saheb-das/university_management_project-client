import { useState } from "react";
import { format } from "date-fns";

import Container from "@/components/shared/Container";
import TransactionList from "../components/ui/TransactionList";
import TransactionFilter from "../components/ui/TransactionFilter";

export type TransactionType = "salary" | "tuition-fees";

export interface ITransaction {
  type: string;
  id: string;
  amount: number;
  date: string;
  time: string;
  utrNo: string;
}

export interface IFilterProps {
  date: Date | undefined;
  type: TransactionType | "all";
  utr: string;
}

export const transactions: ITransaction[] = [
  {
    id: "1",
    amount: 5000,
    date: "2023-07-01",
    time: "09:30:00",
    utrNo: "UTR123456",
    type: "salary",
  },
  {
    id: "2",
    amount: 1000,
    date: "2023-07-02",
    time: "14:15:00",
    utrNo: "UTR234567",
    type: "tuition-fees",
  },
  {
    id: "3",
    amount: 2000,
    date: "2023-07-03",
    time: "11:45:00",
    utrNo: "UTR345678",
    type: "salary",
  },
  {
    id: "4",
    amount: 3000,
    date: "2023-07-04",
    time: "16:00:00",
    utrNo: "UTR456789",
    type: "salary",
  },
  {
    id: "5",
    amount: 1500,
    date: "2023-07-05",
    time: "10:30:00",
    utrNo: "UTR567890",
    type: "tuition-fees",
  },
  {
    id: "6",
    amount: 2500,
    date: "2023-07-06",
    time: "13:00:00",
    utrNo: "UTR678901",
    type: "salary",
  },
  {
    id: "7",
    amount: 1800,
    date: "2023-07-07",
    time: "15:45:00",
    utrNo: "UTR789012",
    type: "tuition-fees",
  },
  {
    id: "8",
    amount: 3500,
    date: "2023-07-08",
    time: "11:30:00",
    utrNo: "UTR890123",
    type: "salary",
  },
  {
    id: "9",
    amount: 1200,
    date: "2023-07-09",
    time: "14:00:00",
    utrNo: "UTR901234",
    type: "tuition-fees",
  },
  {
    id: "10",
    amount: 4000,
    date: "2023-07-10",
    time: "10:00:00",
    utrNo: "UTR012345",
    type: "salary",
  },
];

function Transaction() {
  const [filteredTransactions, setFilteredTransactions] =
    useState<ITransaction[]>(transactions);

  const handleFilter = ({ date, type, utr }: IFilterProps) => {
    const filtered = transactions.filter((transaction) => {
      const dateMatch =
        !date || transaction.date === format(date, "yyyy-MM-dd");
      const typeMatch = type === "all" || transaction.type === type;
      const utrMatch = transaction.utrNo
        .toLowerCase()
        .includes(utr.toLowerCase());
      return dateMatch && typeMatch && utrMatch;
    });

    setFilteredTransactions(filtered);
  };
  return (
    <>
      <Container>
        <TransactionFilter onFilter={handleFilter} />
        <TransactionList transactions={filteredTransactions} />
      </Container>
    </>
  );
}

// export
export default Transaction;
