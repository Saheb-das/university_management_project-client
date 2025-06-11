import Container from "@/components/shared/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JsonToForm, { JsonSchema } from "../components/shared/JsonToForm";
import Heading from "@/components/shared/Heading";
import { useRecoilValue } from "recoil";
import { userBasicAtom } from "@/recoil/atoms/userBasicAtom";
import { useGetFormsWithSchemaIdentity } from "../hooks/useGetFormsWithSchemaByIdentity";
import { dynamicFormsWithSchemaAtom } from "../recoil/officeAtom";
import { useState } from "react";
import { useSubmitOtherForm } from "../hooks/useSubmitOtherForm";
import { ISubmitOtherProps } from "../types/office";
import { toast } from "sonner";

const CommonOffice = () => {
  const [selTitle, setSelTitle] = useState("");
  const [schema, setSchema] = useState({} as JsonSchema);
  const basicUser = useRecoilValue(userBasicAtom);
  const formsWithSchema = useRecoilValue(dynamicFormsWithSchemaAtom);

  useGetFormsWithSchemaIdentity(basicUser?.role!);

  const { mutate, isPending } = useSubmitOtherForm();

  const handleSelect = (val: string) => {
    setSelTitle(val);
    const s = formsWithSchema.find((item) => item.formId === val)?.formValue;
    if (!s) return;

    setSchema(JSON.parse(s));
  };

  const handleCommonSubmit = (formData: { [key: string]: any }) => {
    const submitPayload: ISubmitOtherProps = {
      identity: { name: basicUser?.name! },
      keyInfo: { formName: selTitle },
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
      <Tabs defaultValue="form-fillup" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-background ">
          <TabsTrigger value="form-fillup" className="text-base">
            Form Fillup
          </TabsTrigger>
        </TabsList>

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
                  onFormSubmit={handleCommonSubmit}
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

export default CommonOffice;
