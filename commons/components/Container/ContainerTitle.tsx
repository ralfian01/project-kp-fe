import React, { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}

const ContainerTitle: React.FC<ContainerProps> = ({
  children,
}: ContainerProps) => {
  return (
    <>
      <h3 className="font-medium text-dark dark:text-white">{children}</h3>
    </>
  );
};

export default ContainerTitle;
