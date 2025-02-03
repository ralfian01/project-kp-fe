import React, { ReactNode } from "react";

type Props = React.TableHTMLAttributes<HTMLTableElement> & {
  className?: string;
  head?: ReactNode;
  body?: ReactNode;
};

const Table = ({ className = "", head, body, ...rest }: Props) => {
  return (
    <table className={`${className}`} {...rest}>
      {head ? <thead>{head}</thead> : ""}
      {body ? <tbody>{body}</tbody> : ""}
    </table>
  );
};

export default Table;
