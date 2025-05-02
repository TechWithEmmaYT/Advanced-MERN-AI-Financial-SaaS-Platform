import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  selectedDay: z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ScheduleReportForm = () => {
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      frequency: "monthly",
      selectedDay: "mon", // default to Monday
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  // Get summary text based on form values
  const getScheduleSummary = () => {
    const frequency = form.watch("frequency");
    const selectedDay = form.watch("selectedDay");

    let summary = "Report will be sent ";

    switch (frequency) {
      case "daily":
        summary += "every day";
        break;
      case "weekly":
        if (selectedDay) {
          // Convert day abbreviation to full day name
          const dayNames: Record<string, string> = {
            mon: "Monday",
            tue: "Tuesday",
            wed: "Wednesday",
            thu: "Thursday",
            fri: "Friday",
            sat: "Saturday",
            sun: "Sunday",
          };
          summary += `every ${dayNames[selectedDay]}`;
        }
        break;
      case "monthly":
        summary += "once a month on the last day";
        break;
      case "yearly":
        summary += "once a year";
        break;
    }

    return summary;
  };

  return (
    <div className="pt-5 px-2.5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full space-y-6 flex-1 px-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Enter email address"
                        {...field}
                        className="flex-1"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Frequency */}
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat On</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Day Selection - Only show for weekly */}
            {form.getValues().frequency === "weekly" && (
              <FormField
                control={form.control}
                name="selectedDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Day</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "mon", label: "Mon" },
                        { value: "tue", label: "Tue" },
                        { value: "wed", label: "Wed" },
                        { value: "thu", label: "Thu" },
                        { value: "fri", label: "Fri" },
                        { value: "sat", label: "Sat" },
                        { value: "sun", label: "Sun" },
                      ].map((day) => {
                        const isSelected = field.value === day.value;
                        return (
                          <Button
                            type="button"
                            key={day.value}
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "rounded-full !cursor-pointer !text-[13px] !font-normal h-10 w-10 p-0",
                              isSelected && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => {
                              field.onChange(day.value); // Set only one day
                            }}
                          >
                            {day.label}
                          </Button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Schedule Summary */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Schedule Summary</h3>
              <p className="text-sm text-muted-foreground">
                {getScheduleSummary()}
              </p>
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 py-2 bg-white">
              <Button type="submit" className="w-full">
                Set Schedule
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ScheduleReportForm;
