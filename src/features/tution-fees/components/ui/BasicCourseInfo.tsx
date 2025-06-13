// internal import
import InlineInfo from "../shared/InlineInfo";

interface Props {
  deg: string;
  course: string;
  curSem: number;
  batch: string;
}

type BasicInfo = {
  basicCourse: Props;
};

const BasicCourseInfo = ({ basicCourse }: BasicInfo) => {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-4 text-primary capitalize">
        course basic details
      </h1>
      <div className="mb-7">
        <InlineInfo label={"degree"} name={basicCourse.deg} />
        <InlineInfo label={"course"} name={basicCourse.course} />
        <InlineInfo label={"batch"} name={basicCourse.batch} />
        <InlineInfo
          label={"current semester"}
          name={`${basicCourse.curSem}th`}
        />
      </div>
    </>
  );
};

// export
export default BasicCourseInfo;
