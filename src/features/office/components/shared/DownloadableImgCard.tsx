// external image
import { Download } from "lucide-react";

// internal import
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ImageCard {
  title: string;
  imgUrl: string;
  isDisabled: boolean;
}

const DownloadableImageCard = ({ title, imgUrl, isDisabled }: ImageCard) => {
  return (
    <>
      <Card className="mb-5">
        <CardHeader>
          <CardTitle className="capitalize">{title}</CardTitle>
          <CardDescription>
            <img src={imgUrl} alt={title} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled={isDisabled}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

// export
export default DownloadableImageCard;
