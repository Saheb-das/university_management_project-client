// external import
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

// internal import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { asignTeacherUsersAtom } from "../../recoil/asignTeacherAtom";
import { useTeachers } from "../../hooks/useTeachers";

const TeachersList = () => {
  const navigate = useNavigate();
  const { isError, isLoading } = useTeachers();
  const teachersInfo = useRecoilValue(asignTeacherUsersAtom);

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
        {isLoading && (
          <tr>
            <td>Loading...</td>
          </tr>
        )}
        {isError && <p>something went wrong...</p>}
        {teachersInfo &&
          teachersInfo.length > 0 &&
          teachersInfo.map((item) => (
            <TableRow
              className="cursor-pointer"
              key={item.id}
              onClick={() => navigate(`${item.profile.stuff.id}`)}
            >
              <TableCell>
                {item.firstName} {item.lastName}
              </TableCell>
              <TableCell>{item.profile.stuff.highestDegree}</TableCell>
              <TableCell>
                <ul className="list-disc pl-5">
                  {item.profile.stuff.asignTeachers.length === 0 ? (
                    <p>there are no asign department</p>
                  ) : (
                    item.profile.stuff.asignTeachers.length > 0 &&
                    item.profile.stuff.asignTeachers.map((asign, idx) => (
                      <li key={idx} className="capitalize">
                        {asign.department.type} (sem:{asign.semester.semNo})
                      </li>
                    ))
                  )}
                </ul>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TeachersList;
