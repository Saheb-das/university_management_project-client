import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoutineViewer from "./RoutineViewer";
import { RoutineCreator } from "./RoutineCreator";
import Container from "@/components/shared/Container";

const Routine = () => {
  return (
    <Container>
      <Tabs defaultValue="view">
        <TabsList className="w-full gird grid-cols-5 gap-2 mb-4">
          <TabsTrigger className="text-base " value="view">
            view
          </TabsTrigger>
          <TabsTrigger className="text-base " value="create">
            create
          </TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <RoutineViewer />
        </TabsContent>
        <TabsContent value="create">
          <RoutineCreator />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Routine;
