// external import
import { MapPin, Book, Users, Trophy, GraduationCap } from "lucide-react";
import { useRecoilValue } from "recoil";

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
import { collageAtom } from "../recoil/collageAtom";
import { useCollageInfo } from "../hooks/useCollageInfo";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { convertFilePathUrl } from "@/utils/convertPath";
import ImageViewer from "@/components/shared/ImageViewer";

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
  const basicUser = useRecoilValue(userBasicAtom);
  if (!basicUser) return null;

  const { isError, isLoading } = useCollageInfo(basicUser.collageId);

  const collageInfo = useRecoilValue(collageAtom);
  if (!collageInfo) return null;

  const collageLogo = collageInfo.avatar
    ? convertFilePathUrl(collageInfo.avatar)
    : "";

  return (
    <Container>
      {isLoading && <p>Loading ...</p>}
      {isError && <p>something went wrong</p>}
      {collageInfo && (
        <>
          <ImageViewer srcUrl={collageLogo} altText={"collage logo"} />

          <div className="min-h-screen  p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center text-secondary-foreground">
                {collageInfo.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollageInfoCard
                  title="location"
                  icon={<MapPin className="mr-2" />}
                  value={collageInfo.address}
                />

                <CollageInfoCard
                  title="established"
                  icon={<GraduationCap className="mr-2" />}
                  value={collageInfo.established}
                />
                {/* TODO: total student number */}
                <CollageInfoCard
                  title="student body"
                  icon={<Users className="mr-2" />}
                  value={`${""} students`}
                />

                <CollageInfoCard
                  title="ranking"
                  icon={<Trophy className="mr-2" />}
                  value={`#${collageInfo.ranking} Nationally`}
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
                      {collageInfo.programs.map((item, index) => (
                        <li key={index} className="text-lg capitalize">
                          {item}
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
                        <dt className="font-semibold">Approved By</dt>
                        <dd>{collageInfo.approvedBy}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Student-Faculty Ratio</dt>
                        <dd>16:1</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Campus Size</dt>
                        <dd>{collageInfo.campusSize} acres</dd>
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
        </>
      )}
    </Container>
  );
};

export default Collage;
