// external import
import { useState } from "react";

// internal import
import Container from "@/components/shared/Container";
import TransactionList from "../components/ui/TransactionList";
import TransactionFilter from "../components/ui/TransactionFilter";
import { useAllTransactions } from "../hooks/useAllTransactions";

export type TransactionType = "salary" | "tutionFee" | "all";

export interface ITransaction {
  type: string;
  id: string;
  amount: number;
  date: string;
  time: string;
  utrNo: string;
}

export interface IFilterProps {
  date: string | undefined;
  type: TransactionType | undefined;
}

interface FilterState {
  fromDate?: string;
  selType?: Exclude<TransactionType, "all">;
}

function Transaction() {
  const [filters, setFilters] = useState<FilterState>({
    fromDate: undefined,
    selType: undefined,
  });
  const [utrNo, setUtrNo] = useState("");

  const { isError, isLoading, error } = useAllTransactions(
    filters.fromDate,
    filters.selType
  );

  const handleFilter = ({ date, type }: IFilterProps) => {
    setFilters((prev) => ({
      ...prev,
      fromDate: date,
      selType: type === "all" ? undefined : type,
    }));
  };
  return (
    <>
      <Container>
        <TransactionFilter
          utr={utrNo}
          setUtr={setUtrNo}
          onFilter={handleFilter}
        />
        {isLoading ? (
          "Transactions Loading..."
        ) : isError ? (
          error?.message
        ) : (
          <TransactionList utr={utrNo} />
        )}
      </Container>
    </>
  );
}

// export
export default Transaction;
