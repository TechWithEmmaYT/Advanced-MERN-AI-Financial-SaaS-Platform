import { _REPORT_STATUS } from "@/constant";
import { ReportType } from "@/features/report/reportType";

export const REPORT_DATA:ReportType[] = [
    {
      _id: "1",
      period: "April 1–30, 2025",
      sentDate: "2025-05-01",
      userId: "1",
      createdAt: "2025-05-01",
      updatedAt: "2025-05-01",
      status: _REPORT_STATUS.SENT,
      __v: 0,
    },
    {
      _id: "2",
      period: "March 1–31, 2025",
      sentDate: "2025-04-01",
      userId: "1",
      createdAt: "2025-05-01",
      updatedAt: "2025-05-01",
      status: _REPORT_STATUS.SENT,
      __v: 0,
    },
    {
      _id: "3",
      period: "February 1–28, 2025",
      sentDate: "2025-03-01",
      userId: "1",
      createdAt: "2025-05-01",
      updatedAt: "2025-05-01",
      status: _REPORT_STATUS.SENT,
      __v: 0,
    },
  ];
  