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
