export type TAvatarField =
  | "profilePic"
  | "document"
  | "project"
  | "event"
  | "collageLogo";

interface IApiRes {
  success: boolean;
  message: string;
}

export interface IDocBody {
  file: File;
  batchName: string;
  semNo: string;
  subName: string;
}

export interface IUploadAvatar extends IApiRes {
  profile: {
    id: string;
    address: string;
    phoneNo: string;
    aadharNo: string;
    avatar: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUploadLogo extends IApiRes {
  collageLogo: {
    id: string;
    name: string;
    address: string;
    registrationNo: string;
    approvedBy?: string;
    avatar?: string;
    ranking?: string;
    established: string;
    programs: string[];
    campusSize?: string;
    bankAccountId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUploadDocRes extends IApiRes {
  docPath: string;
}
