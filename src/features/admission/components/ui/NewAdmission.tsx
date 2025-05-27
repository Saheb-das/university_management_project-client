// external import
import { useState } from "react";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { studentFields } from "../../data/student";
import BatchSelector from "./BatchFilter";
import { useCreateAdmission } from "../../hooks/useCreateAdmission";
import { studentSchema, TAdmissionBody } from "@/zod/admission";

const NewAdmission = () => {
  const [formData, setFormData] = useState<TAdmissionBody>(
    {} as TAdmissionBody
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof TAdmissionBody, string>>
  >({});

  const { mutate, isPending } = useCreateAdmission();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const studentPayload = {
      ...formData,
      role: "student",
    };
    const result = studentSchema.safeParse(studentPayload);

    if (!result.success) {
      const zodErrors: Partial<Record<keyof TAdmissionBody, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof TAdmissionBody;
        zodErrors[field] = err.message;
      });
      setErrors(zodErrors);

      return;
    }

    mutate(result.data, {
      onSuccess: (res) => {
        if (!res) return res;
        console.log(res);

        if (res.success) {
          toast.success(res.message || "admission successfull");
        }
      },
      onError: (err) => {
        toast.error(err.message || "admission failed");
      },
      onSettled: () => {
        setFormData({} as TAdmissionBody);
      },
    });
  };

  return (
    <>
      <BatchSelector />

      <Card>
        <CardHeader>
          <CardTitle className="capitalize text-xl font-medium">
            new student admission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {studentFields.map((field) => (
              <div key={field.name}>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name as keyof TAdmissionBody] ?? ""}
                  onChange={handleChange}
                  className="mb-1"
                />
                {errors[field.name as keyof TAdmissionBody] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name as keyof TAdmissionBody]}
                  </p>
                )}
              </div>
            ))}
            <Button
              disabled={isPending}
              type="submit"
              className="col-span-2 cursor-pointer"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

// export
export default NewAdmission;
