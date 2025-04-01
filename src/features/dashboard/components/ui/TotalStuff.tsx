import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IStaff {
  accountants: number;
  examCellWorkers: number;
  counsellors: number;
}

const TotalStuff = ({ staffData }: { staffData: IStaff }) => {
  return (
    <Card className=" shadow-xl  ">
      <CardHeader>
        <CardTitle className="text-lg">Staff Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Accountants</h3>
            <p className="text-3xl font-bold">{staffData.accountants}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Exam Cell Workers</h3>
            <p className="text-3xl font-bold">{staffData.examCellWorkers}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Counsellors</h3>
            <p className="text-3xl font-bold">{staffData.counsellors}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// export
export default TotalStuff;
