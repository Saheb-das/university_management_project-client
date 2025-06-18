import Container from "@/components/shared/Container";
import StuffFilter from "../components/ui/StuffFilter";
import SalaryPayment from "../components/ui/SalaryPayment";

const AccountantDashboard = () => {
  return (
    <Container>
      <StuffFilter />
      <SalaryPayment />
    </Container>
  );
};

export default AccountantDashboard;
