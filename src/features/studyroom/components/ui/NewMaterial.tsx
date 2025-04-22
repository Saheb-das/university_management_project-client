// external import
import { useState } from "react";

// internal import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewMaterial = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium capitalize">
          new study material
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-2">
              <Label className="text-base" htmlFor="department">
                Department
              </Label>
              <Select>
                <SelectTrigger id="department" className="w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ee">Electrical Engineering</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base" htmlFor="degree">
                Degree
              </Label>
              <Select>
                <SelectTrigger id="degree" className="w-full">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">B.Tech</SelectItem>
                  <SelectItem value="mtech">M.Tech</SelectItem>
                  <SelectItem value="phd">Ph.D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base" htmlFor="batch">
                Batch
              </Label>
              <Select>
                <SelectTrigger id="batch" className="w-full">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">bachelor-CSE-2021</SelectItem>
                  <SelectItem value="2nd">bachelor-EEE-2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base" htmlFor="semester">
                Semester
              </Label>
              <Select>
                <SelectTrigger id="semester" className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Semester</SelectItem>
                  <SelectItem value="2nd">2nd Semester</SelectItem>
                  <SelectItem value="3rd">3rd Semester</SelectItem>
                  <SelectItem value="4th">4th Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base" htmlFor="subject">
              Subject
            </Label>
            <Select>
              <SelectTrigger id="subject" className="w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">subject 1</SelectItem>
                <SelectItem value="2nd">subject 2</SelectItem>
                <SelectItem value="3rd">subject 3</SelectItem>
                <SelectItem value="4th">subject 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-base" htmlFor="title">
              Title
            </Label>
            <Input
              className="text-[15px] "
              id="title"
              placeholder="Enter material title"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base" htmlFor="document">
              Upload Document
            </Label>
            <Input id="document" type="file" onChange={handleFileChange} />
          </div>
          <Button type="submit" className="capitalize">
            upload
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// export
export default NewMaterial;
