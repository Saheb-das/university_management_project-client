// external import
import React, { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JsonSchema {
  title: string;
  type: string;
  properties: {
    [key: string]: {
      type: string;
      title: string;
      enum?: string[];
    };
  };
  required?: string[];
}

interface FormProps {
  schema: JsonSchema;
}

function JsonToForm({ schema }: FormProps) {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: string]: any }[]>(
    []
  );

  const handleInputChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({});
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{schema.title}</CardTitle>
          <CardDescription>Fill up important forms</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(schema.properties).map((key) => {
              const field = schema.properties[key];
              const isRequired = schema.required?.includes(key);

              if (field.enum) {
                // Render select dropdown for enum fields
                return (
                  <div key={key} className="space-y-2">
                    <Label className="block font-semibold">
                      {field.title}{" "}
                      {isRequired && <span className="text-red-500">*</span>}
                    </Label>
                    <Select
                      value={formData[key] || ""}
                      onValueChange={(value) => handleInputChange(key, value)}
                      required={isRequired}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Select ${field.title}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.enum.map((option, idx) => (
                          <SelectItem key={idx} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              // Render input fields for other types
              return (
                <div key={key} className="space-y-2">
                  <Label className="block font-semibold">
                    {field.title}{" "}
                    {isRequired && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    className="border p-2 rounded w-full"
                    value={formData[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    required={isRequired}
                  />
                </div>
              );
            })}

            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display submitted data in a table */}
      {submittedData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold">Submitted Data</h2>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                {Object.keys(schema.properties).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {schema.properties[key].title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, idx) => (
                <tr key={idx}>
                  {Object.keys(schema.properties).map((key) => (
                    <td key={key} className="border border-gray-300 px-4 py-2">
                      {data[key] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default JsonToForm;
