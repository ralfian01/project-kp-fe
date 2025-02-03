import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useState } from "react";

interface HeaderDropdownProps {
  className?: string;
  label: string;
  options?: Array<any>;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  label,
  options,
  className,
}: HeaderDropdownProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div
        className={`relative overflow-visible rounded-[5px] border border-gray-400 px-4 py-[7px] ${className}`}
      >
        <div
          onClick={handleClick}
          className="flex w-full items-center justify-between text-center font-medium"
        >
          <span>{label}</span>
          <ChevronDownIcon
            className="ml-2 font-semibold"
            style={{ height: "20px" }}
          />
        </div>
        {active ? (
          options ? (
            <div className="absolute left-0 top-[100%] z-10 h-fit w-full rounded-[5px] border border-gray-500 bg-white shadow-lg">
              {options?.map((item: any, key: number) => (
                <div
                  key={key}
                  className="w-full bg-white px-4 py-[7px] hover:bg-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default HeaderDropdown;
