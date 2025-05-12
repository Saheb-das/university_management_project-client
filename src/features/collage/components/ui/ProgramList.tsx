// external import
import { useState } from "react";
import { X } from "lucide-react";

// internal import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// types import
import { Program } from "@/zod/collage";

interface ProgramListProps {
  programs: Program;
  onChange: (programs: Program) => void;
}

export function ProgramList({ programs, onChange }: ProgramListProps) {
  const [newProgram, setNewProgram] = useState("");

  const addProgram = () => {
    if (newProgram.trim()) {
      onChange([...(programs ? programs : ""), newProgram]);
      setNewProgram("");
    }
  };

  const removeProgram = (index: number) => {
    onChange(programs?.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {programs &&
        programs.map((program, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input value={program} readOnly />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeProgram(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      <div className="flex items-center space-x-2">
        <Input
          value={newProgram}
          onChange={(e) => setNewProgram(e.target.value)}
          placeholder="New program name"
        />
        <Button type="button" onClick={addProgram}>
          Add
        </Button>
      </div>
    </div>
  );
}
