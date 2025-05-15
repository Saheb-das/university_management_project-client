// external import
import { useState } from "react";

// internal import
import { toast } from "sonner";
import { useCreateStuff } from "./useCreateStuff";
import { stuffSchema } from "@/zod/user";

// types import
import { TStuffClient } from "@/zod/user";
import { TStuffRole } from "../types/stuff";

export const useStuffForm = () => {
  const [roleValue, setRoleValue] = useState("");
  const [formData, setFormData] = useState<TStuffClient>({} as TStuffClient);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof TStuffClient, string>>
  >({});

  const { mutate, isPending } = useCreateStuff();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setRoleValue(value);
    setFormData((prev) => ({ ...prev, role: value as TStuffRole }));
    setFormErrors((prev) => ({ ...prev, role: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = stuffSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof TStuffClient, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof TStuffClient;
        fieldErrors[field] = err.message;
      });
      setFormErrors(fieldErrors);
      return;
    }

    mutate(result.data, {
      onSuccess: (res) => {
        toast.success(res?.message || "User created successfully");
        resetForm();
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong");
      },
    });
  };

  const resetForm = () => {
    setFormData({} as TStuffClient);
    setFormErrors({});
    setRoleValue("");
  };

  return {
    formData,
    formErrors,
    roleValue,
    isPending,
    handleChange,
    handleRoleChange,
    handleSubmit,
  };
};
