

export interface ReportType {
    _id: string;
    userId: string;
    period: string;
    sentDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetAllReportResponse {
    message: string;
    reports: ReportType[];
    pagination: {
        pageSize: number;
        pageNumber: number;
        totalCount: number;
        totalPages: number;
        skip: number;
    }
}


export interface UpdateReportSettingParams {
    isEnabled: boolean;
}