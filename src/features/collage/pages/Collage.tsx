// external import
import { MapPin, Book, Users, Trophy, GraduationCap } from "lucide-react";

// internal import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/shared/Container";
import CollageInfoCard from "../components/shared/CollageInfoCard";

const collegeData = {
  name: "Swami Vivekananda University",
  location: "Bara-khthalia, Barackpore, North 24 paraganas, WB",
  established: 1965,
  students: 15000,
  programs: ["Computer Science", "Business", "Engineering", "Arts", "Medicine"],
  ranking: 25,
  acceptanceRate: "68%",
};

const Collage = () => {
  return (
    <Container>
      <div className="w-28 h-28 rounded-full bg-secondary mx-auto mt-3">
        <img src="" alt="collage logo" />
      </div>
      <div className="min-h-screen  p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-secondary-foreground">
            {collegeData.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollageInfoCard
              title="location"
              icon={<MapPin className="mr-2" />}
              value={collegeData.location}
            />

            <CollageInfoCard
              title="established"
              icon={<GraduationCap className="mr-2" />}
              value={collegeData.established}
            />

            <CollageInfoCard
              title="student body"
              icon={<Users className="mr-2" />}
              value={`${collegeData.students.toLocaleString()} students`}
            />

            <CollageInfoCard
              title="ranking"
              icon={<Trophy className="mr-2" />}
              value={`#${collegeData.ranking} Nationally`}
            />

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2" /> Programs
                </CardTitle>
                <CardDescription>Top programs offered</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                  {collegeData.programs.map((program, index) => (
                    <li key={index} className="text-lg">
                      {program}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-semibold">Acceptance Rate</dt>
                    <dd>{collegeData.acceptanceRate}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Student-Faculty Ratio</dt>
                    <dd>16:1</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Campus Size</dt>
                    <dd>500 acres</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Mascot</dt>
                    <dd>The Evergreen Eagles</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Collage;
