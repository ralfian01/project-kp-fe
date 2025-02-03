import React, { ReactNode } from "react";

type Props = React.TableHTMLAttributes<HTMLTableHeaderCellElement> & {
  children?: ReactNode;
  className?: string;
};

const TableHead = ({ children, className = "", ...rest }: Props) => {
  return (
    <th className={`p-2 align-bottom ${className}`} {...rest}>
      {children}
    </th>
  );
};

export default TableHead;
