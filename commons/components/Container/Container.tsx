import React, { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  header?: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  header,
  className,
}: ContainerProps) => {
  return (
    <>
      <div
        className={`rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card ${className ?? ""}`}
      >
        {header ? (
          <div className="flex items-start justify-between border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            {header}
          </div>
        ) : (
          ""
        )}
        {children ? <div className="px-6.5 py-4">{children}</div> : ""}
      </div>
    </>
  );
};

export default Container;
