import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TableDataItem = {
  [key: string]: any;
  data: { [key: string]: string | number };
};

interface DataTableProps {
  tableData: TableDataItem[];
}

function DataTable({ tableData }: DataTableProps) {
  const dynamicHeaders = Object.keys(tableData[0]?.data || {});
  return (
    <ScrollArea className="w-full p-2 bg-background text-foreground border rounded-md">
      <Table className=" border-collapse">
        <TableHeader>
          <TableRow className=" text-lg ">
            <TableHead className="font-bold border-r">Identity</TableHead>
            {dynamicHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-bold border-r last:border-r-0"
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-base">
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "" : "bg-muted/50"}
            >
              {/* Identity cell as Dynamic */}
              <TableCell className="font-medium border-r">
                {Object.entries(row).map(([key, value]) => {
                  // Skip the `data` field if it exists (or any other unwanted fields)
                  if (key === "data") return null;

                  return (
                    <div className="font-normal" key={key}>
                      <span className="font-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>{" "}
                      {value}
                    </div>
                  );
                })}
              </TableCell>

              {/* Dynamic cells */}
              {dynamicHeaders.map((header) => (
                <TableCell key={header} className="border-r last:border-r-0">
                  {row.data[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

// export
export default DataTable;
