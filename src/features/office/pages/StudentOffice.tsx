import Container from "@/components/shared/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JsonToForm from "../components/shared/JsonToForm";
import AdmitAndIdentityCard from "../components/ui/AdmitAndIdentityCard";
import Heading from "@/components/shared/Heading";

// dummy data form
const jsonFormData = {
  title: "Basic Details",
  type: "object",
  properties: {
    fullname: {
      type: "string",
      title: "Full Name",
    },
    email: {
      type: "string",
      title: "Email",
    },
    phoneNo: {
      type: "string",
      title: "Phone Number",
    },
    course: {
      type: "string",
      title: "Course",
      enum: ["computer science", " electrical", " civil", " medical"],
    },
  },
  required: ["fullname", "email", "course"],
};

const StudentOffice = () => {
  return (
    <Container>
      <Tabs defaultValue="admit-identity" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-background ">
          <TabsTrigger value="admit-identity" className="text-base">
            Admit & Identity Card
          </TabsTrigger>
          <TabsTrigger value="form-fillup" className="text-base ">
            Form Fillup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="admit-identity">
          <AdmitAndIdentityCard />
        </TabsContent>
        <TabsContent value="form-fillup">
          {jsonFormData ? (
            <JsonToForm schema={jsonFormData} />
          ) : (
            <Heading title="there are no form yet" />
          )}
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default StudentOffice;
