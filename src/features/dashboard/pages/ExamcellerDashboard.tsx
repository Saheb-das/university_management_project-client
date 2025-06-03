import Container from "@/components/shared/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentTableWithFilter from "../components/ui/StudentTableWithFilter";

const ExamcellerDashboard = () => {
  return (
    <Container>
      <div className="container mx-auto py-3  ">
        <Tabs defaultValue="roll-reg">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger className="text-base" value="roll-reg">
              Roll & Registration
            </TabsTrigger>
            <TabsTrigger className="text-base" value="admit">
              Admit Create
            </TabsTrigger>
            <TabsTrigger className="text-base" value="result">
              Result Create
            </TabsTrigger>
          </TabsList>
          <TabsContent className="mt-6" value="roll-reg">
            <StudentTableWithFilter />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default ExamcellerDashboard;
