// external import
import React, { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StudentFilter from "../shared/StudentFilter";
import { useCreateDynamicForm } from "../../hooks/useCreateDynamicForm";
import { IFormBody } from "../../types/office";
import { toast } from "sonner";
import queryClient from "@/react-query/client";

export interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "checkbox";
  required: boolean;
  options?: string[];
}

export interface FilterFields {
  department: string;
  degree: string;
  batch: string;
}

export interface JsonSchema {
  title: string;
  type: "object";
  properties: {
    [key: string]: {
      type: string;
      title: string;
      enum?: string[];
    };
  };
  required: string[];
}

type TRoleForOffice =
  | "counsellor"
  | "accountant"
  | "teacher"
  | "admin"
  | "student";

const roleArr: TRoleForOffice[] = [
  "student",
  "teacher",
  "accountant",
  "counsellor",
  "admin",
];

function DynamicFormBuilder() {
  const [formTitle, setFormTitle] = React.useState("");
  const [role, setRole] = useState<TRoleForOffice | string>("student");
  const [stayTime, setStayTime] = useState({ time: 0, error: "" });

  const [filterFields, setFilterFields] = React.useState<FilterFields>({
    department: "",
    degree: "",
    batch: "",
  });
  const [fields, setFields] = React.useState<Field[]>([]);

  const { mutate, isPending } = useCreateDynamicForm({
    ttlInSec: String(stayTime.time * 36000),
  });

  const isFilterComplete = fields.length > 0;

  const handleFieldChange = (index: number, key: keyof Field, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    if (key === "type" && value === "select") {
      updatedFields[index].options = ["Option 1", "Option 2"];
    }
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([
      ...fields,
      { name: "", label: "", type: "text", required: false, options: [] },
    ]);
  };

  const removeField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const recreateForm = () => {
    setFormTitle("");
    setFilterFields({ department: "", degree: "", batch: "" });
    setFields([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (stayTime.time === 0) {
      return setStayTime((prev) => ({
        ...prev,
        error: "time should be greater that 0",
      }));
    }

    const schema: JsonSchema = {
      title: formTitle || "Generated Form",
      type: "object",
      properties: {},
      required: [],
    };

    fields.forEach((field) => {
      schema.properties[field.name] = {
        type: field.type === "checkbox" ? "boolean" : field.type,
        title: field.label,
      };

      if (field.type === "select" && field.options) {
        schema.properties[field.name].enum = field.options;
      }

      if (field.required) {
        schema.required.push(field.name);
      }
    });

    // here api called
    const formPayload: IFormBody = {
      formId: formTitle,
      role: role,
      batchId: role === "student" ? filterFields.batch : "",
      formSchema: JSON.stringify(schema),
    };

    mutate(formPayload, {
      onSuccess: (res) => {
        if (!res) return res;

        if (res.success && res.formKey) {
          console.log("cacheKey:", res.formKey);
          queryClient.invalidateQueries({
            queryKey: ["form-titles"],
          });

          toast.success(res.message || "form created");
        }
      },
      onError: (err) => {
        toast.error(err.message || "form creation failed");
      },
      onSettled: () => {
        setFormTitle("");
        setFilterFields({ department: "", degree: "", batch: "" });
        setFields([]);
        setRole("");
        setStayTime({ time: 0, error: "" });
      },
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <Label className="text-lg" htmlFor="formTitle">
                Form Title
              </Label>
              <Input
                className="text-base"
                id="formTitle"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter form title"
              />
            </div>

            <div className=" w-full grid grid-cols-12 gap-4 ">
              <div className="col-span-6">
                <Label className="text-lg" htmlFor="role">
                  Target User's Role
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    {roleArr.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="capitalize"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* stay time */}
              <div className="col-span-6">
                <Label className="text-lg" htmlFor="stayTime">
                  Form Stay Time ( hours )
                </Label>
                <Input
                  className="text-base"
                  id="stayTime"
                  value={stayTime.time}
                  type="number"
                  onChange={(e) =>
                    setStayTime((prev) => ({
                      ...prev,
                      time: Number(e.target.value),
                      error: "",
                    }))
                  }
                  placeholder="Enter form stay time"
                />
                {stayTime.error && (
                  <p className="text-red-400">{stayTime.error}</p>
                )}
              </div>
            </div>

            {role === "student" && (
              <StudentFilter
                filterFields={filterFields}
                setFilterFields={setFilterFields}
              />
            )}
          </div>

          {fields.map((field, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base">Field Name</Label>
                    <Input
                      className="text-[15px]"
                      value={field.name}
                      onChange={(e) =>
                        handleFieldChange(index, "name", e.target.value)
                      }
                      placeholder="Enter field name"
                    />
                  </div>
                  <div>
                    <Label className="text-base">Field Label</Label>
                    <Input
                      className="text-[15px]"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(index, "label", e.target.value)
                      }
                      placeholder="Enter field heading"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-base">Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(val) =>
                      handleFieldChange(index, "type", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent className="text-[15px]">
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {field.type === "select" && (
                  <div className="mt-4">
                    <Label className="text-base">
                      Options (comma-separated)
                    </Label>
                    <Textarea
                      className="text-[15px]"
                      value={field.options?.join(", ") || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "options",
                          e.target.value.split(",").map((o) => o.trim())
                        )
                      }
                      placeholder="Option 1, Option 2, Option 3"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) =>
                        handleFieldChange(index, "required", checked)
                      }
                    />
                    <Label>Required</Label>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeField(index)}
                  >
                    Remove Field
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button type="button" onClick={addField}>
            Add Field
          </Button>

          <div className="flex space-x-4">
            <Button type="submit" disabled={!isFilterComplete}>
              {isPending ? "Sending..." : "Send"}
            </Button>
            <Button type="button" variant="outline" onClick={recreateForm}>
              Recreate Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default DynamicFormBuilder;
