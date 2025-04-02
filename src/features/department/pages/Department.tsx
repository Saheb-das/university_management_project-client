// external import
import { useState } from "react";

// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewDepartment, { TCourse } from "../components/shared/NewDepartment";
import Container from "@/components/shared/Container";
import AddNewCourse from "../components/ui/AddNewCourse";
import AddSubjectInCourse from "../components/shared/UpdateCourse";

export type Department = {
  name: string;
  type: string;
  code: string;
  courses: TCourse[];
};

const dummyDepartments: Department[] = [
  {
    name: "Computer Science",
    type: "Engineering",
    code: "CSE",
    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        semesters: 8,
        totalFees: "400000",
        degree: "B.Tech",
      },
      {
        name: "M.Tech Computer Science",
        duration: "2 Years",
        semesters: 4,
        totalFees: "250000",
        degree: "M.Tech",
      },
    ],
  },
  {
    name: "Electrical Engineering",
    type: "Engineering",
    code: "EEE",
    courses: [
      {
        name: "B.Tech Electrical",
        duration: "4 Years",
        semesters: 8,
        totalFees: "380000",
        degree: "B.Tech",
      },
      {
        name: "Diploma Electrical",
        duration: "3 Years",
        semesters: 6,
        totalFees: "150000",
        degree: "Diploma",
      },
    ],
  },
];

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
          </Tabs>
        </div>
      </Container>
    </>
  );
}

// export
export default Department;
