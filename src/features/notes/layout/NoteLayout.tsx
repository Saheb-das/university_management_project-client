import Container from "@/components/shared/Container";
import { Outlet } from "react-router";

const NoteLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default NoteLayout;
