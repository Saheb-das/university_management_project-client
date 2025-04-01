// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewMaterial from "../components/ui/NewMaterial";
import MaterialsList from "../components/ui/MaterialList";

const StudyRoom = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Course Materials</h1>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger className="text-base" value="upload">
              Upload
            </TabsTrigger>
            <TabsTrigger className="text-base" value="materials">
              Materials
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <NewMaterial />
          </TabsContent>
          <TabsContent value="materials">
            <MaterialsList />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// export
export default StudyRoom;
