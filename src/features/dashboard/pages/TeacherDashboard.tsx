import Container from "@/components/shared/Container";
import StatusCard from "../components/shared/StatusCard";
import Lectures from "../components/ui/Lecture";

export interface ILecture {
  time: string;
  class: string;
  room: string;
  status: string;
}

const schedules: Record<string, ILecture[]> = {
  Monday: [
    {
      time: "09:00 AM - 10:30 AM",
      class: "Mathematics 101",
      room: "Room 201",
      status: "finished",
    },
    {
      time: "11:00 AM - 12:30 PM",
      class: "History 202",
      room: "Room 105",
      status: "running",
    },
    {
      time: "02:00 PM - 03:30 PM",
      class: "Physics 301",
      room: "Lab 3",
      status: "pending",
    },
    {
      time: "04:00 PM - 05:30 PM",
      class: "Computer Science 401",
      room: "Lab 1",
      status: "pending",
    },
  ],
  Tuesday: [
    {
      time: "10:00 AM - 11:30 AM",
      class: "Literature 201",
      room: "Room 302",
      status: "pending",
    },
    {
      time: "01:00 PM - 02:30 PM",
      class: "Chemistry 102",
      room: "Lab 2",
      status: "pending",
    },
    {
      time: "03:00 PM - 04:30 PM",
      class: "Art History 301",
      room: "Room 401",
      status: "pending",
    },
  ],
  // Add more days as needed
};

const TeacherDashboard = () => {
  const studentSatisfaction = 80;
  const regularity = 90;
  const salaryUpdate = "Disbursed on Monday, March 22, 2025 at 10:30 AM";
  return (
    <Container>
      <div className="flex gap-3 mb-8">
        <StatusCard
          title="Student Satisfaction"
          value={studentSatisfaction}
          color="bg-blue-500"
        />
        <StatusCard
          title="Regularity"
          value={regularity}
          color="bg-green-500"
        />
        <StatusCard
          title="Salary Update"
          value={salaryUpdate}
          color="bg-yellow-500"
        />
      </div>
      <Lectures schedules={schedules} />
    </Container>
  );
};

export default TeacherDashboard;
