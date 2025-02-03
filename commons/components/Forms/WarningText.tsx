import React from "react";

type Props = {
  className?: string;
  children?: string;
  text?: string;
};

const WarningText: React.FC<Props> = ({
  className,
  text,
  children,
  ...rest
}) => {
  return (
    <>
      <div className={`mt-2 text-[0.8em] text-red-600 ${className}`}>
        {text ?? children}
      </div>
    </>
  );
};

export default WarningText;
