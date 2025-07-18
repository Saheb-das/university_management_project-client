// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewDepartment from "../components/shared/NewDepartment";
import Container from "@/components/shared/Container";
import AddNewCourse from "../components/ui/AddNewCourse";
import AddSubjectInCourse from "../components/shared/AddSubjectInCourse";
import ShowSubjects from "../components/ui/ShowSubjects";
import AddExams from "../components/ui/AddExams";

function Department() {
  return (
    <>
      <Container>
        <div className="container mx-auto py-3  ">
          <Tabs defaultValue="public">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger className="text-base" value="public">
                Academic Department
              </TabsTrigger>
              <TabsTrigger className="text-base" value="addCourse">
                Add New Course
              </TabsTrigger>
              <TabsTrigger className="text-base" value="update">
                Add Course Subjects
              </TabsTrigger>
              <TabsTrigger className="text-base" value="show-subject">
                Show Subjects
              </TabsTrigger>
              <TabsTrigger className="text-base" value="add-exams">
                Add Exams
              </TabsTrigger>
            </TabsList>
            <TabsContent className="mt-6" value="public">
              <NewDepartment />
            </TabsContent>
            <TabsContent className="mt-6" value="addCourse">
              <AddNewCourse />
            </TabsContent>
            <TabsContent value="update">
              <AddSubjectInCourse />
            </TabsContent>
            <TabsContent value="show-subject">
              <ShowSubjects />
            </TabsContent>
            <TabsContent value="add-exams">
              <AddExams />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </>
  );
}

// export
export default Department;
