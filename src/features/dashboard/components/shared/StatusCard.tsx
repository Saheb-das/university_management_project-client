// external import
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

// internal import
import { Card, CardContent } from "@/components/ui/card";
import { tailwindColorToHex } from "@/utils/tailwindColorToHex";

interface IStatusCard {
  title: string;
  value: number | string;
  color: string;
}

const StatusCard = ({ title, value, color }: IStatusCard) => {
  return (
    <Card className="shadow-lg shrink-0 pt-0 rounded-lg w-76 ">
      <div
        className={`py-4 px-5 text-center rounded-tl-lg rounded-tr-lg text-lg font-bold text-white ${color}`}
      >
        {title}
      </div>
      <CardContent className=" flex justify-center items-center">
        {typeof value === "number" ? (
          <div className="w-20 h-20">
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              styles={buildStyles({
                textSize: "24px",
                textColor: tailwindColorToHex(color),
                pathColor: tailwindColorToHex(color),
                trailColor: "#e5e7eb",
              })}
            />
          </div>
        ) : (
          <p className="text-xl font-semibold text-card-foreground text-center">
            {value || "Loading..."}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
