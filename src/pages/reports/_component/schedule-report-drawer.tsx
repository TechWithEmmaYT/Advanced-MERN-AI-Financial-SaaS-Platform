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
        <Button className="!cursor-pointer !px-6 !text-white">
          <CalendarIcon className="h-4 w-4" />
          <span>Report Settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Report Settings
          </DrawerTitle>
          <DrawerDescription className="-mt-1">
            Enable or disable monthly financial report emails
          </DrawerDescription>
        </DrawerHeader>

        <ScheduleReportForm />
      </DrawerContent>
    </Drawer>
  );
};

export default ScheduleReportDrawer;
