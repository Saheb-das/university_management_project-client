// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import DataTable from "./DataTable";
import { formTitlesAtom } from "../../recoil/officeAtom";
import { useFormTitles } from "../../hooks/useFormTitles";
import { useGetSubmittedFormData } from "../../hooks/useGetSubmittedFormData";

function DynamicFormData() {
  const [selFormTitle, setSelFormTitle] = useState("");
  const formTitlesInfo = useRecoilValue(formTitlesAtom);

  useFormTitles();
  const { data, isSuccess } = useGetSubmittedFormData(selFormTitle);

  return (
    <div className="flex gap-3 mt-5">
      <div className="basis-[15%]">
        {formTitlesInfo && formTitlesInfo.length > 0 ? (
          formTitlesInfo.map((title) => (
            <div
              className="mb-5 cursor-pointer rounded-lg px-2 py-2 bg-background text-foreground font-bold text-center  capitalize"
              onClick={() => setSelFormTitle(title)}
            >
              {title.split("_")[2]}
            </div>
          ))
        ) : (
          <p>there are no form data yet</p>
        )}
      </div>
      <div className="flex-grow">
        {isSuccess && data && data.formData.length > 0 ? (
          <DataTable tableData={data.formData} />
        ) : (
          <p className="text-lg text-center capitalize font-medium">
            click form to show data
          </p>
        )}
      </div>
    </div>
  );
}

// export
export default DynamicFormData;
