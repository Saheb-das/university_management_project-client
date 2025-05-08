// external import
import { useRecoilValue } from "recoil";

// internal import
import Container from "@/components/shared/Container";
import InfoRow from "../../../../components/shared/InfoRow";
import { formattedCompleteProfileSelector } from "../../recoil/selector/profileSelector";
import { useCompleteProfile } from "../../hooks/useCompleteProfile";

const ShowProfile = () => {
  const { isError, isLoading } = useCompleteProfile();

  const profileInfo = useRecoilValue(formattedCompleteProfileSelector);

  if (isLoading) {
    return <p>Fetching Profile Data... Please Wait for minutes</p>;
  }

  if (isError) {
    return <p>something went wrong!</p>;
  }

  if (!profileInfo) {
    return (
      <>
        <p>user profile loading ...</p>
      </>
    );
  }

  return (
    <Container>
      <div className="w-full p-4 bg-card rounded-lg shadow-lg mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 ">
          <div className="col-span-1 ">
            <InfoRow label="first name" name={profileInfo.firstName} />
          </div>
          <div className="col-span-1">
            <InfoRow label="last name" name={profileInfo.lastName} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <InfoRow label="email" name={profileInfo.email} />
          </div>
          <div className="col-span-1">
            <InfoRow label="phone no" name={profileInfo.phoneNo} />
          </div>
        </div>
        <div>
          <InfoRow label="address" name={profileInfo.address} />
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <InfoRow label="aadharNo" name={profileInfo.aadharNo} />
          </div>
          <div className="col-span-1">
            <InfoRow label="activeStatus" name={profileInfo.activeStatus} />
          </div>
        </div>

        {/* for student role */}
        {profileInfo.role === "student" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Date of Birth" name={profileInfo.dob} />
            <InfoRow label="Guardian Name" name={profileInfo.guardianName} />
            <InfoRow
              label="Relation with Guardian"
              name={profileInfo.relWithGuardian}
            />
            <InfoRow
              label="Grade at Higher Secondary"
              name={profileInfo.gradeAtHigherSec}
            />
            <InfoRow label="Grade at Secondary" name={profileInfo.gradeAtSec} />
            <InfoRow label="Admission Year" name={profileInfo.admissionYear} />
            <InfoRow label="Roll Number" name={profileInfo.rollNo} />
            <InfoRow
              label="Registration Number"
              name={profileInfo.registretionNo}
            />
          </div>
        )}

        {profileInfo.role !== "student" && (
          <>
            <div>
              <InfoRow
                label="highest degree"
                name={profileInfo.highestDegree}
              />
            </div>
            <div>
              <InfoRow
                label="specialization"
                name={profileInfo.specializedIn}
              />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default ShowProfile;
