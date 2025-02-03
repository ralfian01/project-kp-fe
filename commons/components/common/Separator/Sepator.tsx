import React from "react";

// ## Props for component
interface Props {
  style?: React.CSSProperties;
  className?: string;
}

/**
 * UI Component
 * @param {String} className - Component className
 * @param {React.CSSProperties} style - Component style
 */
const Separator: React.FC<Props> = ({ className = "", style = {} }: Props) => {
  // ## Combine props className with its default className
  className = `page-separator h-[10px] w-full my-5 ${className}`;

  // ## Combine props style with its default style
  style = { ...{ content: "" }, ...style };

  return <div className={className} style={style}></div>;
};

export default Separator;
