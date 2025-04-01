import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  data: string;
  subTitle: string;
  icon: React.ReactNode;
}

function InfoCard({ title, data, icon, subTitle }: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium capitalize">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-sm text-muted-foreground">{subTitle}</p>
      </CardContent>
    </Card>
  );
}

// export
export default InfoCard;
