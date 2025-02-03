"use client";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  className?: string;
  label: string;
  data?: {
    value: number | string;
    caption: string;
  };
};

const CardProgress: React.FC<Props> = ({ className, label, data }) => {
  //
  return (
    <>
      <div
        className={`flex h-full justify-between rounded-md border border-dark-6 bg-white p-5 ${className}`}
      >
        <div className="mr-1 w-full">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white p-1">
            <AcademicCapIcon className="w-full text-primary" />
          </div>
          <div className="mt-2 text-lg font-semibold">{label}</div>
        </div>

        <div className="w-fit text-center">
          <div className="text-3xl font-semibold">{data?.value}</div>
          <div className="text-md mt-2 whitespace-nowrap">{data?.caption}</div>
        </div>
      </div>
    </>
  );
};

export default CardProgress;
