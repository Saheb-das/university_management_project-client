import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IStuff {
  [key: string]: number;
}

const TotalStuff = ({ stuffData }: { stuffData: IStuff[] }) => {
  const data = stuffData.reduce((acc, cur) => {
    return { ...acc, ...cur };
  }, {});

  return (
    <Card className=" shadow-xl  ">
      <CardHeader>
        <CardTitle className="text-lg">Staff Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Accountants</h3>
            <p className="text-3xl font-bold">{data["accountant"]}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Exam Cell Workers</h3>
            <p className="text-3xl font-bold">{data["examceller"]}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Counsellors</h3>
            <p className="text-3xl font-bold">{data["counsellor"]}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// export
export default TotalStuff;
