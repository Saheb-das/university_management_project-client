// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SemesterInfo from "../components/ui/SemesterInfo";
import AcademicInfo from "../components/ui/AcademicInfo";
import Container from "@/components/shared/Container";

function Academic() {
  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold mb-6">
          Student Academic Information
        </h1>
        <Tabs defaultValue="details">
          <TabsList className="w-full grid-cols-5">
            <TabsTrigger className="text-base" value="details">
              Details
            </TabsTrigger>
            <TabsTrigger className="text-base" value="semester">
              Semester
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <AcademicInfo />
          </TabsContent>
          <TabsContent value="semester">
            <SemesterInfo />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}

// export
export default Academic;
