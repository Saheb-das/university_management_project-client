import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router";

interface ITeacher {
  name: string;
  degree: string;
  departments: string[];
}

const teachers = [
  {
    name: "Dr. Rajesh Kumar",
    degree: "Ph.D. (Computer Science)",
    departments: [
      "B.Tech CSE 3rd Sem (Data Structures)",
      "B.Tech CSE 5th Sem (Algorithms)",
    ],
  },
  {
    name: "Prof. Neha Sharma",
    degree: "M.Tech (Electronics)",
    departments: [
      "B.Tech ECE 2nd Sem (Digital Electronics)",
      "B.Tech ECE 4th Sem (Microprocessors)",
    ],
  },
  {
    name: "Dr. Anil Verma",
    degree: "Ph.D. (Mathematics)",
    departments: [
      "B.Tech CSE 1st Sem (Engineering Mathematics)",
      "B.Tech ME 2nd Sem (Applied Mathematics)",
    ],
  },
  {
    name: "Prof. Pooja Mehta",
    degree: "M.Tech (Mechanical)",
    departments: [
      "B.Tech ME 3rd Sem (Thermodynamics)",
      "B.Tech ME 5th Sem (Fluid Mechanics)",
    ],
  },
  {
    name: "Dr. Sunil Yadav",
    degree: "Ph.D. (Physics)",
    departments: [
      "B.Tech CSE 1st Sem (Engineering Physics)",
      "B.Tech ECE 3rd Sem (Semiconductor Physics)",
    ],
  },
];

const TeachersList = () => {
  const navigate = useNavigate();
  const { userRole, userId } = useParams();
  const baseUrl = `${userRole}/${userId}`;
  return (
    <Table className="bordar p-4 rounded-lg">
      <TableHeader>
        <TableRow className="bg-secondary text-secondary-foreground">
          <TableHead>Teacher Name</TableHead>
          <TableHead>Highest Degree</TableHead>
          <TableHead>Departments & Classes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher, index) => (
          <TableRow
            className="cursor-pointer"
            key={index}
            onClick={() => navigate(`${index}`)}
          >
            <TableCell>{teacher.name}</TableCell>
            <TableCell>{teacher.degree}</TableCell>
            <TableCell>
              <ul className="list-disc pl-5">
                {teacher.departments.map((dept, i) => (
                  <li key={i}>{dept}</li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeachersList;
