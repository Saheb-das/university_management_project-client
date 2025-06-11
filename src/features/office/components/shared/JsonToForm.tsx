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

export interface JsonSchema {
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
  isPending: boolean;
  schema: JsonSchema;
  onFormSubmit: (data: { [key: string]: any }) => void;
}

function JsonToForm({ schema, onFormSubmit, isPending }: FormProps) {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleInputChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
    setFormData({});
  };

  if (!schema || !schema.properties) {
    return <p>Click title to Open form.</p>;
  }

  return (
    <div className="p-4 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{schema.title}</CardTitle>
          <CardDescription>Fill up important forms</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {schema &&
              Object.keys(schema.properties).map((key) => {
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
              // disabled={!isPending}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isPending ? "Submiting" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default JsonToForm;
