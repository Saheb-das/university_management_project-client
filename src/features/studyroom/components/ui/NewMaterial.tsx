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
import { toast } from "sonner";
import { IDocBody } from "@/features/upload/types/upload";
import { INewMaterialBody } from "../../types/studyRoom";
import { useNewMaterial } from "../../hooks/useNewMaterial";

const NewMaterial = () => {
  const {
    filter,
    file,
    title,
    setFilter,
    setFile,
    setTitle,
    isConfirm,
    setIsConfirm,
    getSelections,
    uploadDocMutate,
    isPending,
    materialMutate,
    materialIsPending,
    asignsWithBatchInfo,
    semData,
    subData,
    handleFileChange,
  } = useNewMaterial();

  const handleDocSubmit = () => {
    if (!file) return alert("Invalid file");

    const { asignWithBatch, sem, sub } = getSelections();
    if (!asignWithBatch || !sem || !sub) return;

    const payload: IDocBody = {
      file,
      batchName: asignWithBatch.batch.name,
      semNo: String(sem.semNo),
      subName: sub.name,
    };

    uploadDocMutate(payload, {
      onSuccess: (res) => {
        if (res?.success) {
          toast.success(res.message || "Document uploaded");
          setFilter((f) => ({ ...f, filePath: res.docPath }));
          setIsConfirm(true);
        }
      },
      onError: (err) => toast.error(err.message || "Document upload failed"),
    });
  };

  const handleSubmit = () => {
    if (!file) return alert("Select a file");

    const { asignWithBatch, sem, sub } = getSelections();
    if (!asignWithBatch || !sem || !sub) return;

    const payload: INewMaterialBody = {
      title,
      filePath: filter.filePath,
      batchName: asignWithBatch.batch.name,
      semNo: String(sem.semNo),
      subName: sub.name,
    };

    materialMutate(payload, {
      onSuccess: (res) => {
        if (res?.success) toast.success(res.message || "Material created");
      },
      onError: (err) => toast.error(err.message || "Creation failed"),
      onSettled: () => {
        setFilter({
          batch: "",
          sem: "",
          sub: "",
          filePath: "",
        });
        setFile(null);
        setIsConfirm(false);
        setTitle("");
      },
    });
  };

  const batchMap = new Map();
  asignsWithBatchInfo &&
    asignsWithBatchInfo.forEach((item) => {
      if (!batchMap.has(item.batchId)) {
        batchMap.set(item.batchId, item);
      }
    });

  const uniqueAsignBatch = Array.from(batchMap.values());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium capitalize">
          new study material
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* batch */}
            <div className="space-y-2">
              <Label className="text-base" htmlFor="batch">
                Asigned Batch
              </Label>
              <Select
                value={filter.batch}
                onValueChange={(v) =>
                  setFilter((prev) => ({ ...prev, batch: v }))
                }
              >
                <SelectTrigger id="batch" className="w-full">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  {asignsWithBatchInfo &&
                    uniqueAsignBatch.map((b) => (
                      <SelectItem
                        key={b.id}
                        value={b.batchId}
                        className="capitalize"
                      >
                        {b.batch?.name || ""}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* semester */}
            <div className="space-y-2">
              <Label className="text-base" htmlFor="semester">
                Semester
              </Label>
              <Select
                value={filter.sem}
                onValueChange={(v) =>
                  setFilter((prev) => ({ ...prev, sem: v }))
                }
              >
                <SelectTrigger id="semester" className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semData &&
                    semData.batchSemDetails.course.semesters.length > 0 &&
                    semData.batchSemDetails.course.semesters.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        sem {s.semNo}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* subject */}
            <div className="space-y-2">
              <Label className="text-base" htmlFor="subject">
                Subject
              </Label>
              <Select
                value={filter.sub}
                onValueChange={(v) =>
                  setFilter((prev) => ({ ...prev, sub: v }))
                }
              >
                <SelectTrigger id="subject" className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subData &&
                    subData.subjects.length > 0 &&
                    subData.subjects.map((subj) => (
                      <SelectItem
                        key={subj.id}
                        value={subj.id}
                        className="capitalize"
                      >
                        {subj.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* title */}
          <div className="space-y-2">
            <Label className="text-base" htmlFor="title">
              Title
            </Label>
            <Input
              className="text-[15px] "
              id="title"
              placeholder="Enter material title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* upload document( .pdf, .txt) */}
          <div className="space-y-2">
            <Label className="text-base" htmlFor="document">
              Upload Document
            </Label>
            <div className="w-full flex gap-2">
              <Input
                className=""
                id="document"
                type="file"
                onChange={handleFileChange}
              />
              <Button
                onClick={handleDocSubmit}
                disabled={!file}
                className="inline w-30"
              >
                {isConfirm
                  ? "Confirm File"
                  : isPending
                  ? "Confirming..."
                  : "is Confirm "}
              </Button>
            </div>
          </div>

          <Button
            disabled={!isConfirm}
            className="capitalize"
            onClick={handleSubmit}
          >
            {materialIsPending ? "iploading..." : "upload"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// export
export default NewMaterial;
