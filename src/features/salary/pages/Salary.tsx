// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionLists from "../components/ui/TransactionLists";
import { Outlet } from "react-router";
import Container from "@/components/shared/Container";

const Salary = () => {
  // TODO: here api call for fetching transaction list for a particular user

  return (
    <>
      <Container>
        <div className="grid grid-cols-12 gap-4">
          {/* left side */}
          <Card className="col-span-7">
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                Transaction List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionLists />
            </CardContent>
          </Card>

          {/* right side */}
          <div className="col-span-5">
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  );
};

// export
export default Salary;
