// internal import
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CollegeUpdateFormData, collegeUpdateSchema } from "@/zod/collage";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProgramList } from "../components/ui/ProgramList";

const CollageForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CollegeUpdateFormData>({
    resolver: zodResolver(collegeUpdateSchema),
    defaultValues: {
      studentBody: 0,
      ranking: 0,
      programs: [],
      acceptanceRate: 0,
      campusSize: 0,
      studentFacultyRatio: "",
    },
  });

  async function onSubmit(data: CollegeUpdateFormData) {
    setIsSubmitting(true);
    try {
      // TODO: api call
      const result = collegeUpdateSchema.parse(data);
      if (result) {
        toast("Success");
      }
    } catch (error) {
      toast("Failed to update college details");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Update College Details
        </CardTitle>
        <CardDescription>
          Modify the information about your college
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">College Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a new logo for your college
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentBody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Student Body</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Total number of students</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ranking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Ranking</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Current college ranking</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="programs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Programs</FormLabel>
                  <FormControl>
                    <ProgramList
                      programs={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Add or remove college programs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptanceRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Acceptance Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Percentage of applicants accepted
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="campusSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Campus Size (acres)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Size of the campus in acres</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentFacultyRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Student-Faculty Ratio
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 16:1" />
                  </FormControl>
                  <FormDescription>
                    Ratio of students to faculty members
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update College Details"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CollageForm;
