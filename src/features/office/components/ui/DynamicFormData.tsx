import { useState } from "react";
import DataTable, { TableDataItem } from "./DataTable";

const titles = ["basic details", "exam details"];

// dummy data to create a table
const tableDataArray = [
  {
    name: "John Doe",
    department: "Computer Science",
    rollNo: "123456",
    data: {
      hobby: "Reading books",
      goal: "Become a software engineer",
      idol: "Elon Musk",
    },
  },
  {
    name: "Jane Smith",
    department: "Mechanical Engineering",
    rollNo: "654321",
    data: {
      hobby: "Playing guitar",
      goal: "Start a music band",
      idol: "Jimi Hendrix",
    },
  },
  {
    name: "Michael Brown",
    department: "Civil Engineering",
    rollNo: "789012",
    data: {
      hobby: "Gardening",
      goal: "Create a community garden",
      idol: "David Attenborough",
    },
  },
  {
    name: "Emily Davis",
    department: "Electrical Engineering",
    rollNo: "345678",
    data: {
      hobby: "Photography",
      goal: "Travel the world capturing moments",
      idol: "Annie Leibovitz",
    },
  },
  {
    name: "Sarah Johnson",
    department: "Hospitality",
    rollNo: "567890",
    data: {
      hobby: "Cooking",
      goal: "Open a restaurant",
      idol: "Gordon Ramsay",
    },
  },
  {
    name: "Robert Lee",
    department: "Information Technology",
    rollNo: "901234",
    data: {
      hobby: "Coding",
      goal: "Build a successful tech startup",
      idol: "Linus Torvalds",
    },
  },
  {
    name: "Laura Wilson",
    department: "Physical Education",
    rollNo: "112233",
    data: {
      hobby: "Cycling",
      goal: "Complete a cross-country tour",
      idol: "Lance Armstrong",
    },
  },
  {
    name: "Chris Evans",
    department: "Fine Arts",
    rollNo: "445566",
    data: {
      hobby: "Painting",
      goal: "Exhibit art in a gallery",
      idol: "Vincent van Gogh",
    },
  },
  {
    name: "Olivia Martinez",
    department: "Literature",
    rollNo: "778899",
    data: {
      hobby: "Writing",
      goal: "Publish a novel",
      idol: "J.K. Rowling",
    },
  },
  {
    name: "Daniel Garcia",
    department: "Performing Arts",
    rollNo: "998877",
    data: {
      hobby: "Dancing",
      goal: "Win a national competition",
      idol: "Martha Graham",
    },
  },
];

function DynamicFormData() {
  // TODO: fetch all form-data titles
  const [formTitles, setFormTitles] = useState<string[]>(titles);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  const handleTableData = (title: string) => {
    // TODO: cached-data-obj[title] = tableData
    setTableData(tableDataArray);
  };

  return (
    <div className="flex gap-3 mt-5">
      <div className="basis-[15%]">
        {formTitles.length > 0 ? (
          formTitles.map((title) => (
            <div
              className="mb-5 cursor-pointer rounded-lg px-2 py-2 bg-background text-foreground font-bold text-center  capitalize"
              onClick={() => handleTableData(title)}
            >
              {title}
            </div>
          ))
        ) : (
          <p>there are no form data yet</p>
        )}
      </div>
      <div className="flex-grow">
        {tableData.length > 0 ? (
          <DataTable tableData={tableData} />
        ) : (
          <p className="text-lg text-center capitalize font-medium">
            click form to show data
          </p>
        )}
      </div>
    </div>
  );
}

// export
export default DynamicFormData;
