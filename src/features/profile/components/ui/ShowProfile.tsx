import Container from "@/components/shared/Container";
import InfoRow from "../../../../components/shared/InfoRow";
import { TRole } from "@/zod/auth";
import { IProfile } from "../../pages/Profile";

const ShowProfile = ({ data, role }: { data: IProfile; role: TRole }) => {
  return (
    <Container>
      <div className="w-full p-4 bg-card rounded-lg shadow-lg mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 ">
          <div className="col-span-1 ">
            <InfoRow label="first name" name={data.firstName} />
          </div>
          <div className="col-span-1">
            <InfoRow label="last name" name={data.lastName} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <InfoRow label="email" name={data.email} />
          </div>
          <div className="col-span-1">
            <InfoRow label="phone no" name={data.phoneNo} />
          </div>
        </div>
        <div>
          <InfoRow label="address" name={data.address} />
        </div>

        {/* for student role */}
        {role === "student" ? <></> : <></>}

        <div>
          <InfoRow label="highest degree" name={data.highestDegree} />
        </div>
        <div>
          <InfoRow label="specialization" name={data.specialization} />
        </div>
        <div className="">
          <InfoRow label="bank name" name={data.bankName} />
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <InfoRow label="account number" name={data.accountNo} />
          </div>
          <div className="col-span-1">
            <InfoRow label="ifsc code" name={data.ifscCode} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShowProfile;
