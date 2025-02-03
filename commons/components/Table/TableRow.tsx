import React, { ReactNode } from "react";

type Props = React.TableHTMLAttributes<HTMLTableRowElement> & {
  children?: ReactNode;
  className?: string;
};

const TableRow = ({ children, className = "", ...rest }: Props) => {
  return (
    <tr className={`${className}`} {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;
