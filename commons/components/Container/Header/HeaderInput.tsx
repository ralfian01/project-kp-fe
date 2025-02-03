import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useState } from "react";

type HeaderInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  value?: string | number;
};

const HeaderInput: React.FC<HeaderInputProps> = ({
  label,
  value,
  className,
  ...rest
}: HeaderInputProps) => {
  return (
    <>
      <div
        className={`rounded-[5px] border border-gray-400 px-4 py-[7px] font-medium ${className}`}
      >
        <input
          type={rest.type}
          className="w-full border-none outline-none"
          defaultValue={value}
          placeholder={label}
          {...rest}
        />
      </div>
    </>
  );
};

export default HeaderInput;
