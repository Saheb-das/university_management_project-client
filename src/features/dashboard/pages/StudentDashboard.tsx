// internal import
import Heading from "@/components/shared/Heading";
import EventsCard from "../components/ui/EventsCard";
import ProjectsCard from "../components/ui/ProjectsCard";
import SubjectsCard from "../components/ui/SubjectsCard";
import SummaryCard from "../components/ui/SummaryCard";
import TeachersCard from "../components/ui/TeachersCard";
import Container from "@/components/shared/Container";

const StudentDashboard = () => {
  return (
    <Container>
      <div className="grid grid-cols-12 mb-6 ">
        <div className="col-span-5  rounded-lg p-4 bg-secondary text-secondary-foreground">
          <Heading title="summary card" />
          <SummaryCard />
        </div>
      </div>

      <div className=" p-4 mb-6  rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="today class schedule" />
        <SubjectsCard />
      </div>

      <div className=" p-4 mb-6 rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="my teachers" />
        <TeachersCard />
      </div>

      <div className=" p-4 mb-6 rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="upcoming events" />
        <EventsCard />
      </div>

      <div className=" p-4 mb-6 rounded-lg bg-secondary text-secondary-foreground">
        <Heading title="my projects" />
        <ProjectsCard />
      </div>
    </Container>
  );
};

export default StudentDashboard;
