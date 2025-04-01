import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/shared/Container";

const paymentDetails = [
  { label: "Student Name", value: "John Doe" },
  { label: "Student ID", value: "ST12345" },
  { label: "Registration No", value: "093-329-321" },
  { label: "Program", value: "B.Sc in Computer Science" },
  { label: "Semester", value: "Fall 2023" },
  { label: "Late Fine", value: "0.00" },
  { label: "Amount Paid", value: "₹28,000" },
  { label: "Payment Date", value: "30/12/23" },
  { label: "Transaction ID", value: "TXN123456789" },
];

const TuitionFeeReceipt: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <Card className="max-w-lg w-full mx-auto p-6 bg-background text-foreground shadow-lg rounded-2xl border border-gray-200 relative z-10">
          <CardHeader className="text-center">
            <img
              src="/college-logo.png"
              alt="College Logo"
              className="mx-auto w-20 h-20 bg-secondary rounded-full mb-4"
            />
            <CardTitle className="text-primary font-bold text-2xl">
              Receipt
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              123 College Street, City, Country
            </p>
          </CardHeader>
          <CardContent className="text-lg  relative">
            <div className="absolute  mt-24 w-[250px] tracking-wide  text-center text-secondary-foreground text-6xl font-bold opacity-15  -rotate-45">
              XYZ College
            </div>
            <table className="w-full border-collapse text-left text-secondary-foreground">
              <tbody>
                {paymentDetails.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 text-secondary-foreground"
                  >
                    <td className="font-semibold py-2">{item.label}:</td>
                    <td className="py-2">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 text-center text-muted-foreground text-sm">
              <p>Thank you for your payment!</p>
            </div>
            <div className="mt-6 text-right text-sm font-semibold text-secondary-foreground">
              Approved by XYZ College
            </div>
          </CardContent>
        </Card>
        <Button
          variant="default"
          className="mt-6 px-6 py-3 text-lg  rounded-xl shadow-md hover:bg-primary/90"
        >
          Download Receipt
        </Button>
      </div>
    </Container>
  );
};

export default TuitionFeeReceipt;
