import React from "react";

type Props = {
  className?: string;
  children?: string;
  text?: string;
};

const HelpText: React.FC<Props> = ({ className, text, children, ...rest }) => {
  return (
    <>
      <div className={`mt-2 text-[0.7em] text-gray-600 ${className}`}>
        {text ?? children}
      </div>
    </>
  );
};

export default HelpText;
