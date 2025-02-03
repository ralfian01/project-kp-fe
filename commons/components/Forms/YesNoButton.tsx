"use client";
import { useEffect, useState } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  name: string;
  label: {
    yes: string;
    no: string;
  };
  value?: boolean;
  disabled?: boolean;
  onYes?: (...e: any) => any;
  onNo?: (...e: any) => any;
};

const YesNoButton: React.FC<Props> = ({
  className,
  name,
  label,
  value,
  disabled,
  onYes,
  onNo,
}) => {
  const [isYes, setIsYes] = useState<any>(null);

  useEffect(() => {
    if (!disabled) {
      if (value === false || value === true) setIsYes(value);
    }
  }, [value, disabled]);

  return (
    <div className="flex justify-center overflow-hidden rounded-full border border-gray-5 bg-white text-center text-sm">
      <label className="w-full cursor-pointer">
        <div
          className={`w-full whitespace-nowrap p-2 ${isYes === true ? "bg-primary font-semibold text-white" : ""}`}
        >
          {label.yes}
        </div>
        <input
          type="radio"
          value={"yes"}
          name={name}
          style={{ display: "none" }}
          onChange={(e: any) => {
            setIsYes(true);

            if (typeof onYes == "function") onYes(e);
          }}
        />
      </label>
      <div className="flex min-w-[20px] cursor-default items-center justify-center whitespace-nowrap bg-gray-500 font-semibold text-white">
        /
      </div>
      <label className="w-full cursor-pointer">
        <div
          className={`w-full whitespace-nowrap p-2 ${isYes === false ? "bg-primary font-semibold text-white" : ""}`}
        >
          {label.no}
        </div>
        <input
          type="radio"
          value={"no"}
          name={name}
          style={{ display: "none" }}
          onChange={(e: any) => {
            setIsYes(false);

            if (typeof onNo == "function") onNo(e);
          }}
        />
      </label>
    </div>
  );
};

export default YesNoButton;
