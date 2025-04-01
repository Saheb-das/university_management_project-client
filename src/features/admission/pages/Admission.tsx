// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommisionIncome from "../components/ui/CommisionIncome";
import NewAdmission from "../components/ui/NewAdmission";
import AdmittedStudents from "../components/ui/AdmittedStudents";
import Container from "@/components/shared/Container";

function Admission() {
  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold mb-4">Admission Dashboard</h1>
        <Tabs defaultValue="new-admission">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="new-admission">New Admission</TabsTrigger>
            <TabsTrigger value="admitted-students">
              Admitted Students
            </TabsTrigger>
            <TabsTrigger value="commission-income">
              Commission Income
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new-admission">
            <NewAdmission />
          </TabsContent>
          <TabsContent value="admitted-students">
            <AdmittedStudents />
          </TabsContent>
          <TabsContent value="commission-income">
            <CommisionIncome />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}

// export
export default Admission;
