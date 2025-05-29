// external import
import React from "react";

// internal import
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ICardContainer {
  children: React.ReactNode;
  title: string;
  span: string;
  loading?: boolean;
}

const CardContainer = ({ children, title, span, loading }: ICardContainer) => {
  return (
    <Card className={`${span}`}>
      <CardHeader>
        <CardTitle className="text-xl capitalize font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {loading ? <div>loading...</div> : <>{children}</>}
      </CardContent>
    </Card>
  );
};

export default CardContainer;
