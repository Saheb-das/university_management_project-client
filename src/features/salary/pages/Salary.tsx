// external improt
import { Outlet, useParams } from "react-router";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionLists from "../components/ui/TransactionLists";
import Container from "@/components/shared/Container";
import { useSalary } from "../hooks/useSalary";

const Salary = () => {
  const { userRole, userId } = useParams();

  if (!userRole || !userId) {
    return (
      <p>
        userRole:{userRole} or userId:{userId} possibliy undefined
      </p>
    );
  }

  const { error, isLoading } = useSalary(userRole.slice(0, -1), userId);

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
              {isLoading ? (
                <p>Loading ...</p>
              ) : error ? (
                <p>{error.message}</p>
              ) : (
                <TransactionLists />
              )}
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
