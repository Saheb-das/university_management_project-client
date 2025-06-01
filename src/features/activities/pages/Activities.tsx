import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/Container";
import CreateEvent from "../components/UI/CreateEvent";
import { useUpcomingEvents } from "../hooks/useUpcomingEvents";

const Activities = () => {
  useUpcomingEvents();
  return (
    <Container>
      <Tabs defaultValue="event">
        <TabsList className="mt-4 w-full grid-cols-12">
          <TabsTrigger
            className="text-base capitalize col-span-3"
            value="event"
          >
            events
          </TabsTrigger>
          <TabsTrigger className="text-base capitalize col-span-3" value="poll">
            polls
          </TabsTrigger>
        </TabsList>
        <TabsContent value="event">
          <CreateEvent />
        </TabsContent>
        <TabsContent value="poll"></TabsContent>
      </Tabs>
    </Container>
  );
};

// export
export default Activities;
