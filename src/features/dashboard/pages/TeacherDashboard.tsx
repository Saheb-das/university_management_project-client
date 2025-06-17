// external import
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import Container from "@/components/shared/Container";
import StatusCard from "../components/shared/StatusCard";
import Lectures from "../components/ui/Lecture";
import { usePrevMonthTransaction } from "@/hooks/usePrevMonthTransaction";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";

// types import
import { ITransaction } from "@/features/transactions/types/transaction";

export interface ILecture {
  time: string;
  class: string;
  room: string;
  status: string;
}

const TeacherDashboard = () => {
  const [tran, setTran] = useState<ITransaction>();
  const basicUser = useRecoilValue(userBasicAtom);
  const { data: prevTranData, isSuccess: isTranSuccess } =
    usePrevMonthTransaction(basicUser?.id!);

  useEffect(() => {
    if (isTranSuccess && prevTranData) {
      setTran(prevTranData.transaction);
    }
  }, [isTranSuccess, prevTranData]);

  const formattedDate =
    tran &&
    new Date(tran?.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const salaryUpdate = `Disbursed on ${formattedDate} at ${tran?.time} via ${tran?.mode}`;

  return (
    <Container>
      <div className="flex gap-3 mb-8">
        <StatusCard
          title="Salary Update"
          value={tran ? salaryUpdate : "Not updated"}
          color="bg-yellow-500"
        />
      </div>
      <Lectures />
    </Container>
  );
};

export default TeacherDashboard;
