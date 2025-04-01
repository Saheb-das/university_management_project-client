import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Collage from "./Collage";
import CollageForm from "./CollageForm";

const CollageWithTab = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-medium mb-5 capitalize">
        collage information
      </h1>
      <Tabs defaultValue="collage">
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger className="text-base" value="collage">
            Collage
          </TabsTrigger>
          <TabsTrigger className="text-base" value="edit">
            Edit Collage
          </TabsTrigger>
        </TabsList>
        <TabsContent value="collage">
          <Collage />
        </TabsContent>
        <TabsContent value="edit">
          <CollageForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollageWithTab;
