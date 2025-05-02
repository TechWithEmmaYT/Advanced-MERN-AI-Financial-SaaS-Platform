import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import ScheduleReportForm from "./schedule-report-form";

const ScheduleReportDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="!cursor-pointer">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>Set Schedule Report</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Schedule Report
          </DrawerTitle>
          <DrawerDescription className="-mt-1">
            Configure when financial reports should be sent
          </DrawerDescription>
        </DrawerHeader>

        <ScheduleReportForm />
      </DrawerContent>
    </Drawer>
  );
};

export default ScheduleReportDrawer;
