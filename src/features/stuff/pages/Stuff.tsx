import Container from "@/components/shared/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateStuff from "./CreateStuff";
import AllStuff from "./AllStuff";

const Stuff = ({ admin }: { admin: Boolean }) => {
  return (
    <Container>
      <Tabs defaultValue="create-stuff">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger className="text-base" value="create-stuff">
            Create Stuff
          </TabsTrigger>
          <TabsTrigger className="text-base" value="all-stuff">
            All Stuff
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-6" value="create-stuff">
          <CreateStuff admin={admin} />
        </TabsContent>
        <TabsContent value="all-stuff">
          <AllStuff admin={admin} />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Stuff;
