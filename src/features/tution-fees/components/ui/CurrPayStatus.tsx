import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlockInfo from "../shared/BlockInfo";
import InlineInfo from "../shared/InlineInfo";

const currStatus = [
  { label: "Last Date", value: "30/12/23" },
  { label: "Amount", value: "₹28,000" },
  { label: "Late Fine", value: "₹0.00" },
  { label: "Total Amount", value: "₹28,000" },
];

const CurrPayStatus = () => {
  return (
    <Card className=" p-5 bg-background shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-primary font-semibold text-xl capitalize">
          Current Payment Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {currStatus.map((item, index) => (
            <BlockInfo label={item.label} name={item.value} key={index} />
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <InlineInfo label={"late fine charge"} name={"100/day"} />
          <Button
            variant="default"
            className="capitalize  rounded-lg cursor-pointer"
          >
            Pay fee
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrPayStatus;
