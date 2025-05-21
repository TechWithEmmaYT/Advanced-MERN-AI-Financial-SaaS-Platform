import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 25,
}) => {
  return (
    <div className="w-full bg-white dark:bg-background rounded-lg">
      {/* Table Header Skeleton */}
      <div className="flex h-10 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
        {[...Array(columns)].map((_, index) => (
          <div key={`header-col-${index}`} className={`flex-1 px-4 py-2`}>
            <Skeleton className="h-4 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Table Body Skeleton */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex h-10">
            {[...Array(columns)].map((_, colIndex) => (
              <div
                key={`row-${rowIndex}-col-${colIndex}`}
                className={`flex-1 px-4 py-2`}
              >
                <Skeleton className="h-4 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;