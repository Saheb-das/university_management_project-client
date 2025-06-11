// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";

// internal import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/Container";
import JsonToForm, { JsonSchema } from "../components/shared/JsonToForm";
import AdmitAndIdentityCard from "../components/ui/AdmitAndIdentityCard";
import Heading from "@/components/shared/Heading";
import { studentUserAtom } from "@/features/dashboard/recoil/student/dashboardAtom";
import { useGetFormsWithSchemaIdentity } from "../hooks/useGetFormsWithSchemaByIdentity";
import { dynamicFormsWithSchemaAtom } from "../recoil/officeAtom";
import { useSubmitStudentForm } from "../hooks/useSubmitStudentForm";
import { toast } from "sonner";

// types import
import { ISubmitStudentProps } from "../types/office";

const StudentOffice = () => {
  const [schema, setSchema] = useState<JsonSchema>({} as JsonSchema);
  const [selTitle, setSelTitle] = useState("");
  const studentInfo = useRecoilValue(studentUserAtom);
  const formsWithSchema = useRecoilValue(dynamicFormsWithSchemaAtom);
  useGetFormsWithSchemaIdentity(
    studentInfo?.profile?.user?.role,
    studentInfo?.batchId
  );

  const { mutate, isPending } = useSubmitStudentForm();

  const handleSelect = (val: string) => {
    setSelTitle(val);
    const s = formsWithSchema.find((item) => item.formId === val)?.formValue;
    if (!s) return;

    setSchema(JSON.parse(s));
  };

  const handleStudentFormSubmit = (formData: { [key: string]: any }) => {
    const submitPayload: ISubmitStudentProps = {
      identity: {
        name: `${studentInfo?.profile?.user?.firstName} ${studentInfo?.profile?.user?.lastName}`,
        batch: studentInfo?.batch?.name,
        rollNo: studentInfo?.rollNo!,
      },
      keyInfo: { batchId: studentInfo?.batchId, formName: selTitle },
      data: formData,
    };

    mutate(submitPayload, {
      onSuccess: (res) => {
        if (!res) return res;

        if (res) {
          toast.success("form submitted");
        }
      },
      onError: (err) => {
        toast.error(err.message || "form not submitted");
      },
    });
  };

  const titleList =
    formsWithSchema &&
    formsWithSchema.length > 0 &&
    formsWithSchema.map((item) => item.formId);

  return (
    <Container>
      <Tabs defaultValue="admit-identity" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-background ">
          <TabsTrigger value="admit-identity" className="text-base">
            Admit & Identity Card
          </TabsTrigger>
          <TabsTrigger value="form-fillup" className="text-base ">
            Form Fillup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="admit-identity">
          <AdmitAndIdentityCard />
        </TabsContent>
        <TabsContent value="form-fillup">
          {formsWithSchema && formsWithSchema.length > 0 ? (
            <div className="grid grid-cols-12 gap-3 mt-6">
              <div className="col-span-2">
                {titleList &&
                  titleList.map((item) => (
                    <p
                      key={item}
                      onClick={() => handleSelect(item)}
                      className={`font-semibold capitalize cursor-pointer ${
                        selTitle === item ? "text-blue-500" : ""
                      }`}
                    >
                      {item}
                    </p>
                  ))}
              </div>
              <div className="col-span-10">
                <JsonToForm
                  isPending={isPending}
                  onFormSubmit={handleStudentFormSubmit}
                  schema={schema}
                />
              </div>
            </div>
          ) : (
            <Heading title="there are no form yet" />
          )}
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default StudentOffice;
