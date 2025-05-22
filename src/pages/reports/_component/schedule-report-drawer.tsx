import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ScheduleReportForm from "./schedule-report-form";

const ScheduleReportDrawer = () => {
  const [open, setOpen] = useState(false);
  const onCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="!cursor-pointer !px-6 !text-white">
          <CalendarIcon className="h-4 w-4" />
          <span>Report Settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader className="relative">
          <div>
            <DrawerTitle className="text-xl font-semibold">
              Report Settings
            </DrawerTitle>
            <DrawerDescription className="-mt-1">
              Enable or disable monthly financial report emails
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute top-4 right-4">
            <XIcon className="h-5 w-5 !cursor-pointer" />
          </DrawerClose>
        </DrawerHeader>

        <ScheduleReportForm  {...{onCloseDrawer}} />
      </DrawerContent>
    </Drawer>
  );
};

export default ScheduleReportDrawer;
