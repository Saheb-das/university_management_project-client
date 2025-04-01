import InlineInfo from "../shared/InlineInfo";

const BasicCourseInfo = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-4 text-primary capitalize">
        course basic details
      </h1>
      <div className="mb-7">
        <InlineInfo label={"degree"} name={"b.tech"} />
        <InlineInfo label={"course"} name={"computer secience & engineering"} />
        <InlineInfo label={"fees"} name={"2,80,000"} />
        <InlineInfo label={"current semester"} name={"7th"} />
      </div>
    </>
  );
};

// export
export default BasicCourseInfo;
