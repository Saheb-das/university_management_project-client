// external import
import { useParams } from "react-router";

// internal import
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignToDept from "../components/ui/AssignToDept";
import RemoveFromDept from "../components/ui/RemoveFromDept";

// types import
import { IAssignTeacher } from "../components/ui/AssignToDept";

export interface IAsignUser {
  id: string;
  name: string;
  qualification: string;
  departments: string[];
  status: string;
}

const initialUser: IAsignUser[] = [
  {
    id: "1",
    name: "John Doe",
    qualification: "PhD",
    departments: ["Computer Science", "Mathematics", "Physics", "Education"],
    status: "regular",
  },
  {
    id: "2",
    name: "Jane Smith",
    qualification: "MSc",
    departments: ["Mathematics"],
    status: "suspend",
  },
  {
    id: "3",
    name: "Bob Johnson",
    qualification: "PhD",
    departments: ["Physics"],
    status: "regular",
  },
  {
    id: "4",
    name: "Alice Brown",
    qualification: "MEd",
    departments: ["Education"],
    status: "blocked",
  },
  {
    id: "5",
    name: "Michael Williams",
    qualification: "MSc",
    departments: ["Electrical Engineering", "Computer Science"],
    status: "regular",
  },
  {
    id: "6",
    name: "Sarah Taylor",
    qualification: "PhD",
    departments: ["Business Administration", "Economics"],
    status: "regular",
  },
  {
    id: "7",
    name: "David Lee",
    qualification: "MPhil",
    departments: ["Mechanical Engineering"],
    status: "suspend",
  },
  {
    id: "8",
    name: "Emily Clark",
    qualification: "PhD",
    departments: ["Biology", "Chemistry"],
    status: "regular",
  },
  {
    id: "9",
    name: "Chris Martin",
    qualification: "MBA",
    departments: ["Business Administration", "Finance"],
    status: "blocked",
  },
  {
    id: "10",
    name: "Sophia Miller",
    qualification: "MTech",
    departments: ["Civil Engineering", "Architecture"],
    status: "regular",
  },
];

const AsignTeacher = () => {
  const { teacherId } = useParams();

  // TODO: fetch teacher by id
  const assignDept = (selectedDept: IAssignTeacher) => {};
  const removeDept = (userId: string, department: string) => {};
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
            <AssignToDept onAssignTeacher={assignDept} />
          </TabsContent>
          <TabsContent value="remove-teacher">
            <RemoveFromDept onRemove={removeDept} teacher={initialUser[0]} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AsignTeacher;
