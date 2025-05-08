// external import
import { selector } from "recoil";

// internal import
import { completeProfileAtom } from "../atom/completeProfileAtom";
import {
  TBaseProfile,
  TStudentProfile,
  TStuffProfile,
  TStuffRoles,
} from "../../types/profile";

export const formattedCompleteProfileSelector = selector({
  key: "formattedCompleteProfileSelector",
  get: ({ get }) => {
    const raw = get(completeProfileAtom);

    if (!raw) {
      return null;
    }

    const baseProfile: TBaseProfile = {
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      activeStatus: raw.activeStatus,
      address: raw.profile.address,
      phoneNo: raw.profile.phoneNo,
      aadharNo: raw.profile.aadharNo,
      avatar: raw.profile.avatar,
    };

    let stuff: any;
    if (raw.profile.stuff) {
      stuff = {
        ...baseProfile,
        role: raw.role as TStuffRoles,
        highestDegree: raw.profile.stuff.highestDegree,
        specializedIn: raw.profile.stuff.specializedIn,
      };
    }

    let student: any;
    if (raw.profile.student) {
      student = {
        ...baseProfile,
        role: "student",
        dob: raw.profile.student.dob,
        guardianName: raw.profile.student.guardianName,
        relWithGuardian: raw.profile.student.relWithGuardian,
        gradeAtHigherSec: raw.profile.student.gradeAtHigherSec,
        gradeAtSec: raw.profile.student.gradeAtSec,
        admissionYear: raw.profile.student.admissionYear,
        rollNo: raw.profile.student.rollNo || "",
        registretionNo: raw.profile.student.registretionNo || "",
      };
    }

    return raw.role === "student" ? student : stuff;
  },
});
