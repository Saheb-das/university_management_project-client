// external import
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
import { CollegeUpdateFormData, collegeUpdateSchema } from "@/zod/collage";
import { toast } from "sonner";
import { ProgramList } from "../components/ui/ProgramList";
import UploadLogo from "@/features/upload/pages/UploadLogo";
import { collageAtom } from "../recoil/collageAtom";
import { useUpdateCollage } from "../hooks/useUpdateCollage";
import { ICollageUpdatePayload } from "../types/collage";
import { Label } from "@/components/ui/label";

const CollageForm = () => {
  const collageInfo = useRecoilValue(collageAtom);
  const setCollage = useSetRecoilState(collageAtom);

  if (!collageInfo) {
    return;
  }
  const [formData, setFormData] = useState<CollegeUpdateFormData>({
    approvedBy: collageInfo?.approvedBy || "",
    ranking: String(collageInfo?.ranking || ""),
    programs: collageInfo?.programs || [],
    campusSize: String(collageInfo?.campusSize || ""),
  });
  const [errors, setErrors] = useState<
    Record<keyof CollegeUpdateFormData, string>
  >({
    approvedBy: "",
    ranking: "",
    programs: "",
    campusSize: "",
  });

  const { mutate, isPending } = useUpdateCollage(collageInfo.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProgramsChange = (updatedPrograms: string[] | undefined) => {
    setFormData((prev) => ({
      ...prev,
      programs: [...(updatedPrograms ?? "")],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      approvedBy: "",
      ranking: "",
      programs: "",
      campusSize: "",
    });

    const parsed = collegeUpdateSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      parsed.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    const transData: ICollageUpdatePayload = {
      approvedBy: parsed.data.approvedBy,
      campusSize: String(parsed.data.campusSize),
      programs: parsed.data.programs,
      ranking: String(parsed.data.ranking),
    };

    mutate(transData, {
      onSuccess: (res) => {
        const updatedCollage = res?.collage;
        setCollage((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            ...updatedCollage,
          };
        });
        toast("collage updated successfully");
      },
      onError: () => {
        toast("Failed to update college details");
      },
    });
  };

  return (
    <Card className="w-full mx-auto bg-primary-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Update College Details
        </CardTitle>
        <CardDescription>
          Modify the information about your college
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* College Logo */}
        <UploadLogo />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ranking */}
          <div>
            <Label className="text-lg block">Ranking</Label>
            <Input
              type="text"
              name="ranking"
              value={formData.ranking}
              onChange={handleChange}
            />
            {errors.ranking && (
              <p className="text-sm text-red-500">{errors.ranking}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Current college ranking
            </p>
          </div>

          {/* Programs */}
          <div>
            <Label className="text-lg block">Programs</Label>
            <ProgramList
              programs={formData.programs || undefined}
              onChange={handleProgramsChange}
            />
            {errors.programs && (
              <p className="text-sm text-red-500">{errors.programs}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Add or remove college programs
            </p>
          </div>

          {/* Approved By */}
          <div>
            <Label className="text-lg block">Acceptance Rate (%)</Label>
            <Input
              type="text"
              name="approvedBy"
              value={formData.approvedBy}
              onChange={handleChange}
            />
            {errors.approvedBy && (
              <p className="text-sm text-red-500">{errors.approvedBy}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Percentage of applicants accepted
            </p>
          </div>

          {/* Campus Size */}
          <div>
            <Label className="text-lg block">Campus Size (acres)</Label>
            <Input
              type="text"
              name="campusSize"
              value={formData.campusSize}
              onChange={handleChange}
            />
            {errors.campusSize && (
              <p className="text-sm text-red-500">{errors.campusSize}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Size of the campus in acres
            </p>
          </div>

          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending ? "Updating..." : "Update College Details"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CollageForm;
