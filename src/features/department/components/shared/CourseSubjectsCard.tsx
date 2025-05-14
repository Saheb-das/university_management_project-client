// external import
import React from "react";

// internal import
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TCourseSubjects } from "../../types/course";

type Props = {
  courseSubjects: TCourseSubjects;
};

const CourseSubjectsCard: React.FC<Props> = ({ courseSubjects }) => {
  return (
    <div className="space-y-6 mt-8">
      <h1 className="text-3xl font-bold capitalize">{courseSubjects.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseSubjects.semesters.map((semester) => (
          <Card key={semester.id} className="rounded-2xl shadow">
            <CardHeader>
              <CardTitle>Semester {semester.semNo}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {semester.subjects.map((subject, index) => (
                  <li key={index}>{subject.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseSubjectsCard;
