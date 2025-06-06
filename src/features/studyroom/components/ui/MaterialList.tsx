// external import
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { BookOpen, Download } from "lucide-react";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { asignsWithBatchAtom } from "../../recoil/studyroomAtom";
import { getUniqueAsignBatch } from "../../utils/util";
import { useNotesByBatchId } from "../../hooks/useNotesByBatchId";
import { Button } from "@/components/ui/button";
import { INoteWithSub } from "../../types/studyRoom";
import { convertFilePathUrl } from "@/utils/convertPath";

const MaterialsList = () => {
  const asignsWithBatchInfo = useRecoilValue(asignsWithBatchAtom);

  const uniqueAsignBatch = getUniqueAsignBatch(asignsWithBatchInfo);

  const [selectedCategory, setSelectedCategory] = useState(
    uniqueAsignBatch[0].batchId
  );

  const { data: notesData, isSuccess: isNotesSuccess } =
    useNotesByBatchId(selectedCategory);

  const handleRead = (note: INoteWithSub) => {
    window.open(convertFilePathUrl(note.fileUrl), "_blank");
  };

  return (
    <div className="flex h-[500px]">
      <Card className="w-1/4 mr-4">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <ul className="space-y-2">
              {uniqueAsignBatch.length > 0 &&
                uniqueAsignBatch.map((item) => (
                  <li key={item.batchId}>
                    <button
                      onClick={() => setSelectedCategory(item.batchId)}
                      className={`w-full text-left px-2 py-1 rounded ${
                        selectedCategory === item.batchId
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {item.batch.name}
                    </button>
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Study Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isNotesSuccess &&
                notesData &&
                notesData.notes.length > 0 &&
                notesData.notes.map((note) => (
                  <Card className="bg-secondary text-secondary-foreground rounded-2xl shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg capitalize font-semibold">
                        {note.subject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Title: {note.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <Button
                          size="icon"
                          variant="default"
                          className="rounded-full cursor-pointer"
                          title="Read"
                          onClick={() => handleRead(note)}
                        >
                          <BookOpen className="w-5 h-5" />
                        </Button>
                        <a
                          href={note.fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full cursor-pointer text-primary hover:text-primary/80"
                            title="Download"
                          >
                            <Download className="w-5 h-5" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

// export
export default MaterialsList;
