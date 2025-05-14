import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Degree {
  id: string;
  type: string;
}

interface Department {
  id: string;
  type: string;
  degrees: Degree[];
}

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold capitalize">
          Department: {department.type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">Degrees:</h3>
        <ul className="list-disc list-inside space-y-1">
          {department.degrees.length > 0 ? (
            department.degrees.map((degree) => (
              <li key={degree.id} className="text-sm text-muted-foreground">
                {degree.type}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No degrees available</p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
