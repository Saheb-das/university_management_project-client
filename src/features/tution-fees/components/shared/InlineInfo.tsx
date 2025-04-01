import React from "react";

interface InlineInfoProps {
  label: string;
  name: string;
}

const InlineInfo: React.FC<InlineInfoProps> = ({ label, name }) => {
  return (
    <div className="flex gap-2 ">
      <h3 className="font-semibold ">{label}:</h3>
      <p className="text-[17px] capitalize">{name}</p>
    </div>
  );
};

export default InlineInfo;
