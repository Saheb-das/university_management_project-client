// external import
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { studentSchema, TStudentClient } from "@/zod/user";
import { studentFields } from "../../data/student";
import InputField from "../shared/InputField";
import BatchSelector from "./BatchFilter";

function NewAdmission() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStudentClient>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data: TStudentClient) => {
    console.log(data);
    // Here you would typically send this data to your backend
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {studentFields.map((student) => (
              <InputField
                key={student.name}
                name={student.name}
                type={student.type}
                placeholder={student.placeholder}
                register={register}
                error={errors[student.name]}
              />
            ))}
            <Button type="submit" className="col-span-2 cursor-pointer">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

// export
export default NewAdmission;
