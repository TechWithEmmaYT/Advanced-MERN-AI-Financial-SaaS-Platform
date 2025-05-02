import { Fragment, ReactNode } from "react";

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    rightAction?: ReactNode;
    renderPageHeader?: ReactNode
  }
  
const PageHeader = ({ title, subtitle, rightAction,renderPageHeader }: PageHeaderProps) => {
    return (
      <div className="w-full pb-20 pt-4 px-5 lg:px-0 bg-[#1a1e2a] text-white">
        <div className="w-full max-w-[var(--max-width)]  mx-auto">
          {renderPageHeader 
          ? <Fragment>{renderPageHeader}</Fragment> 
          : (
            <div className="w-full flex flex-col gap-3 items-start justify-start lg:items-center lg:flex-row lg:justify-between">
              {(title || subtitle) && (
                <div className="space-y-1">
                  {title && <h2 className="text-2xl lg:text-4xl font-medium">{title}</h2>}
                  {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
                </div>
              )}
              {rightAction && rightAction}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default PageHeader