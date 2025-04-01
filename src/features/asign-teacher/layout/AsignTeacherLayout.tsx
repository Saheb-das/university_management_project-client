// external import
import { Outlet } from "react-router";

// internal improt
import Container from "@/components/shared/Container";

const AsignTeacherLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default AsignTeacherLayout;
