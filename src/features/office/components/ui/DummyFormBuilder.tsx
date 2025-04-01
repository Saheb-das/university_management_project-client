import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  admissionYear: string;
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

function DynamicFormBuilder() {
  const { register, control, watch, setValue, handleSubmit } = useForm<{
    formTitle: string;
    fields: Field[];
    filterFields: FilterFields;
  }>({
    defaultValues: {
      formTitle: "",
      fields: [],
      filterFields: {
        department: "",
        degree: "",
        admissionYear: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  // TODO: this line will be deleted
  const [jsonSchema, setJsonSchema] = React.useState<JsonSchema | null>(null);

  const filterFields = watch("filterFields");
  const isFilterComplete =
    filterFields.department &&
    filterFields.degree &&
    filterFields.admissionYear;

  const addField = () => {
    append({ name: "", label: "", type: "text", required: false, options: [] });
  };

  const updateField = (index: number, key: keyof Field, value: any) => {
    setValue(`fields.${index}.${key}`, value);
    if (key === "type" && value === "select") {
      setValue(`fields.${index}.options`, ["Option 1", "Option 2"]);
    }
  };

  const generateJsonSchemaAndSend = (data: {
    formTitle: string;
    fields: Field[];
    filterFields: FilterFields;
  }) => {
    // init schema
    const schema: JsonSchema = {
      title: data.formTitle || "Generated Form",
      type: "object",
      properties: {},
      required: [],
    };

    // dynamically put data ( field )
    data.fields.forEach((field) => {
      schema.properties[field.name] = {
        type: field.type === "checkbox" ? "boolean" : "string",
        title: field.label,
      };

      if (field.type === "select" && field.options) {
        schema.properties[field.name].enum = field.options;
      }

      if (field.required) {
        schema.required.push(field.name);
      }
    });

    // TODO: It will be deleted and send data to backend
    setJsonSchema(schema);
  };

  // reset
  const recreateForm = () => {
    setValue("formTitle", "");
    setValue("fields", []);
    setValue("filterFields", { department: "", degree: "", admissionYear: "" });
    setJsonSchema(null); // TODO: this line will be deleted
  };
  return (
    <Card className="w-full mx-auto">
      <CardHeader></CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(generateJsonSchemaAndSend)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <Label className="text-lg" htmlFor="formTitle">
                Form Title
              </Label>
              <Input
                className="text-base"
                id="formTitle"
                {...register("formTitle")}
                placeholder="Enter form title"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-lg" htmlFor="department">
                  Department
                </Label>
                <Controller
                  name="filterFields.department"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent className="text-base">
                        <SelectItem value="computer-science">
                          Computer Science
                        </SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label className="text-lg" htmlFor="degree">
                  Degree
                </Label>
                <Controller
                  name="filterFields.degree"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                      <SelectContent className="text-base">
                        <SelectItem value="bachelors">Bachelor's</SelectItem>
                        <SelectItem value="masters">Master's</SelectItem>
                        <SelectItem value="phd">Ph.D.</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label className="text-lg" htmlFor="admissionYear">
                  Admission Year
                </Label>
                <Controller
                  name="filterFields.admissionYear"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent className="text-base">
                        {[2023, 2024, 2025, 2026, 2027].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      className="text-base"
                      htmlFor={`fields.${index}.name`}
                    >
                      Field Name
                    </Label>
                    <Input
                      className="text-[15px]"
                      id={`fields.${index}.name`}
                      {...register(`fields.${index}.name`)}
                      placeholder="Enter field name"
                    />
                  </div>
                  <div>
                    <Label
                      className="text-base"
                      htmlFor={`fields.${index}.label`}
                    >
                      Field Label
                    </Label>
                    <Input
                      className="text-[15px]"
                      id={`fields.${index}.label`}
                      {...register(`fields.${index}.label`)}
                      placeholder="Enter field heading"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-base" htmlFor={`fields.${index}.type`}>
                    Field Type
                  </Label>
                  <Select
                    onValueChange={(value) => updateField(index, "type", value)}
                    value={watch(`fields.${index}.type`)}
                  >
                    <SelectTrigger id={`fields.${index}.type`}>
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
                {watch(`fields.${index}.type`) === "select" && (
                  <div className="mt-4">
                    <Label
                      className="text-base"
                      htmlFor={`fields.${index}.options`}
                    >
                      Options (comma-separated)
                    </Label>
                    <Textarea
                      className="text-[15px]"
                      id={`fields.${index}.options`}
                      {...register(`fields.${index}.options`)}
                      placeholder="Option 1, Option 2, Option 3"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`fields.${index}.required`}
                      checked={watch(`fields.${index}.required`)}
                      onCheckedChange={(checked) =>
                        updateField(index, "required", checked)
                      }
                    />
                    <Label htmlFor={`fields.${index}.required`}>Required</Label>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
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
              Send
            </Button>
            <Button type="button" variant="outline" onClick={recreateForm}>
              Recreate Form
            </Button>
          </div>
        </form>

        {/* TODO: this section will be deleted */}
        {jsonSchema && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Generated JSON Schema</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(jsonSchema, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

// export
export default DynamicFormBuilder;
