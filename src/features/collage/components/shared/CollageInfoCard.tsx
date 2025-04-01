// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CollegeInfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const CollageInfoCard = ({ icon, title, value }: CollegeInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{value}</p>
      </CardContent>
    </Card>
  );
};

export default CollageInfoCard;
