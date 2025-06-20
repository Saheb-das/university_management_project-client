import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  data: string;
  subTitle: string;
  icon: React.ReactNode;
  loading?: boolean;
}

function InfoCard({ title, data, icon, subTitle, loading }: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium capitalize">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <div className="text-2xl font-bold">{data}</div>
            <p className="text-sm text-muted-foreground">{subTitle}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// export
export default InfoCard;
