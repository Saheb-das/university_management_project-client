// internal import
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignToDept from "../components/ui/AssignToDept";
import RemoveFromDept from "../components/ui/RemoveFromDept";

const AsignTeacher = () => {
  return (
    <Card className="mt-4">
      <CardContent>
        <Tabs defaultValue="assign-teacher">
          <TabsList className="mt-4">
            <TabsTrigger
              className="text-base capitalize"
              value="assign-teacher"
            >
              aasign teacher
            </TabsTrigger>
            <TabsTrigger
              className="text-base capitalize"
              value="remove-teacher"
            >
              remove assigned teacher
            </TabsTrigger>
          </TabsList>
          <TabsContent value="assign-teacher">
            <AssignToDept />
          </TabsContent>
          <TabsContent value="remove-teacher">
            <RemoveFromDept />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AsignTeacher;
