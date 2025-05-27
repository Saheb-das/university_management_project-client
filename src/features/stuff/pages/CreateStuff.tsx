// internal import
import { Button } from "@/components/ui/button";
import { TStuffClient } from "@/zod/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formFields } from "../constant/formField";
import { Input } from "@/components/ui/input";
import { useStuffForm } from "../hooks/useStuffForm";

const CreateStuff = ({ admin }: { admin: Boolean }) => {
  const {
    formData,
    roleValue,
    formErrors,
    isPending,
    handleChange,
    handleRoleChange,
    handleSubmit,
  } = useStuffForm();
  return (
    <div className="px-4 py-6 border rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Select onValueChange={handleRoleChange} value={roleValue}>
            <SelectTrigger className="mb-1 w-full">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {admin ? (
                <>
                  <SelectItem value="admin">Admin</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="examceller">Examceller</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="counsellor">Counsellor</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          {formErrors.role && (
            <p className="text-red-500 text-sm">{formErrors.role}</p>
          )}
        </div>

        {formFields.map((item) => (
          <div key={item.id}>
            <Input
              className="mb-1"
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              value={formData[item.name as keyof TStuffClient] || ""}
              onChange={handleChange}
            />
            {formErrors[item.name as keyof TStuffClient] && (
              <p className="text-red-500 text-sm">
                {formErrors[item.name as keyof TStuffClient]}
              </p>
            )}
          </div>
        ))}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create User"}
        </Button>
      </form>
    </div>
  );
};

// export
export default CreateStuff;
