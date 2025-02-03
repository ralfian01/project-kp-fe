import React, { ReactNode } from "react";

type Props = React.TableHTMLAttributes<HTMLTableCellElement> & {
  children?: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
};

const TableCell = ({
  children,
  className = "",
  colSpan,
  rowSpan,
  ...rest
}: Props) => {
  return (
    <td
      className={`p-2 ${className}`}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...rest}
    >
      {children}
    </td>
  );
};

export default TableCell;
