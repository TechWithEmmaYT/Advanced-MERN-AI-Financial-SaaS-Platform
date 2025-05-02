import { _REPORT_STATUS } from "@/constant";
import { ReportType } from "./column";

export const REPORT_DATA:ReportType[] = [
    {
      id: 1,
      period: "April 1–30, 2025",
      sentDate: "2025-05-01",
      status: _REPORT_STATUS.SENT,
    },
    {
      id: 2,
      period: "March 1–31, 2025",
      sentDate: "2025-04-01",
      status: _REPORT_STATUS.SENT,
    },
    {
      id: 3,
      period: "February 1–28, 2025",
      sentDate: "2025-03-01",
      status: _REPORT_STATUS.SENT,
    },
  ];
  