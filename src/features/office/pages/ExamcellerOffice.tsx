// internal import
import Container from "@/components/shared/Container";
import DynamicFormBuilder from "../components/ui/DummyFormBuilder";
import DynamicFormData from "../components/ui/DynamicFormData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ExamcellerOffice() {
  return (
    <>
      <Container>
        <Tabs defaultValue="create-form">
          <TabsList className="grid w-full grid-cols-5 bg-background">
            <TabsTrigger className="text-base" value="create-form">
              Create Form
            </TabsTrigger>
            <TabsTrigger className="text-base" value="form-data">
              Get Form Data
            </TabsTrigger>
          </TabsList>
          <TabsContent className="mt-6" value="create-form">
            <DynamicFormBuilder />
          </TabsContent>
          <TabsContent value="form-data">
            <DynamicFormData />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}

// export
export default ExamcellerOffice;
