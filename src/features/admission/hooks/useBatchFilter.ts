// external import
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { useCourses } from "@/features/department/hooks/useCourses";
import { useDepartments } from "@/features/department/hooks/useDepartments";
import { coursesWithSemestersAtom } from "@/features/department/recoil/coursesAtom";
import { departmentsAtom } from "@/features/department/recoil/departmentAtom";
import { useCreateBatch } from "./useCreateBatch";
import { useBatches } from "./useBatches";
import { toast } from "sonner";

// types import
import { IBatch, TBatchBody } from "../types/admission";

export const useBatchFilter = () => {
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");
  const [batchQ, setBatchQ] = useState({
    deptId: "",
    degId: "",
    courseId: "",
  });
  const [batches, setBatches] = useState<IBatch[]>([]);
  const [isGet, setIsGet] = useState(false);

  const deptInfo = useRecoilValue(departmentsAtom);
  const coursesInfo = useRecoilValue(coursesWithSemestersAtom);

  useDepartments("degree");
  useCourses(degree);
  const { mutate } = useCreateBatch();

  const { data, isSuccess } = useBatches(
    batchQ.deptId,
    batchQ.degId,
    batchQ.courseId
  );

  let degrees =
    department && deptInfo.find((item) => item.id === department)?.degrees;

  const fetchBatch = () => {
    setBatchQ({ deptId: department, degId: degree, courseId: course });
    setIsGet(true);
  };

  const handleCreateBatch = (year: string) => {
    // @ts-ignore
    const selDeg: TDegree | undefined =
      degrees !== "" && degrees?.find((item) => item.id === degree);

    const selCourse =
      coursesInfo && coursesInfo.find((item) => item.id === course);

    const batchPayload: TBatchBody = {
      addmissionYear: year,
      courseId: selCourse?.id!,
      courseName: selCourse?.name!,
      degreeId: selDeg?.id!,
      degreeType: selDeg?.type!,
      departmentId: department,
    };

    mutate(batchPayload, {
      onSuccess: (res) => {
        if (!res) return res;

        if (res.batch) {
          toast.success(res.message || "batch created");
        }
      },
      onError: (err) => {
        toast.error(err.message || "batch not created");
      },
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setBatches(data.batches);
    }
  }, [data, isSuccess, handleCreateBatch, batches]);

  return {
    department,
    setDepartment,
    degree,
    setDegree,
    course,
    setCourse,
    degrees,
    deptInfo,
    coursesInfo,
    fetchBatch,
    handleCreateBatch,
    batches,
    isGet,
    isDisabled: !department || !degree || !course,
  };
};
