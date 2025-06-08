// external import
import { useParams } from "react-router";

// internal import
import Heading from "@/components/shared/Heading";
import EventsCard from "../components/ui/EventsCard";
import ProjectsCard from "../components/ui/ProjectsCard";
import SubjectsCard from "../components/ui/SubjectsCard";
import SummaryCard from "../components/ui/SummaryCard";
import TeachersCard from "../components/ui/TeachersCard";
import Container from "@/components/shared/Container";
import { useStudentUserByUserId } from "../hooks/useStudentUserByUserId";
import { useStudentDashboard } from "../hooks/useStudentDashboard";

const StudentDashboard = () => {
  const { userId } = useParams();
  useStudentUserByUserId(userId || "");
  const { loading, error } = useStudentDashboard();
  return (
    <Container>
      <div className="grid grid-cols-12 mb-6 ">
        <div className="col-span-5  rounded-lg p-4 bg-secondary text-secondary-foreground">
          <Heading title="summary card" />
          {loading.attendance ? (
            <p>Loading...</p>
          ) : error.attendance ? (
            <p>something went wrong</p>
          ) : (
            <SummaryCard />
          )}
        </div>
      </div>

      <div className=" p-4 mb-6  rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="today class schedule" />
        {loading.scheduleLectures ? (
          <p>Loading...</p>
        ) : error.scheduleLectures ? (
          <p> something went wrong</p>
        ) : (
          <SubjectsCard />
        )}
      </div>

      <div className=" p-4 mb-6 rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="my teachers" />
        {loading.myTeachers ? (
          <p>Loading...</p>
        ) : error.myTeachers ? (
          <p>something went wrong</p>
        ) : (
          <TeachersCard />
        )}
      </div>

      <div className=" p-4 mb-6 rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="upcoming events" />
        {loading.event ? (
          <p>Loading...</p>
        ) : error.event ? (
          <p>something went wrong</p>
        ) : (
          <EventsCard />
        )}
      </div>

      <div className=" p-4 mb-6 rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="my projects" />
        {loading.project ? (
          <p>Loading...</p>
        ) : error.project ? (
          <p>something went wrong</p>
        ) : (
          <ProjectsCard />
        )}
      </div>
    </Container>
  );
};

export default StudentDashboard;
