"use client";
import React, { useEffect, useState } from "react";
import useFormValidation from "./useFormValidation";
import HelpText from "./HelpText";
import WarningText from "./WarningText";
import { EyeIcon } from "@heroicons/react/24/outline";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  helpText?: string;
  validationRules?: any;
  warningText?: any;
  trailingNode?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  defaultValue?: any;
  onInput?: (evt: any) => any;
};

const Input: React.FC<Props> = ({
  className,
  label,
  helpText,
  validationRules,
  warningText,
  trailingNode,
  defaultValue,
  onInput,
  ...rest
}) => {
  // ## Form Validation
  const { status, warningNode, validate } = useFormValidation(validationRules);

  const handleInput = (evt: any) => {
    validate(evt.target.value);
  };

  return (
    <>
      <div className={className}>
        <label className="mb-3 flex items-end justify-between text-body-sm font-medium text-dark dark:text-white">
          <div className="w-full">
            {label}
            {rest.required && (
              <span className="ml-1 font-semibold text-red">*</span>
            )}
          </div>
          {rest.type == "file" && defaultValue ? (
            <a
              target="_blank"
              href={defaultValue}
              className="flex w-fit items-center justify-center whitespace-nowrap font-semibold text-blue"
            >
              <EyeIcon style={{ height: "20px" }} className="mr-1" /> Lihat file
            </a>
          ) : (
            ""
          )}
        </label>
        <div
          className={`input-label1 flex items-center justify-between overflow-hidden rounded-[7px] border-[1.5px] border-stroke focus-within:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${rest.type == "file" ? "p-0" : "px-5.5 py-3"}`}
        >
          {trailingNode?.left ? trailingNode?.left : ""}

          <input
            className={`w-full bg-transparent text-dark outline-none transition  placeholder:text-dark-6 disabled:cursor-default ${trailingNode?.left ? "ml-1" : ""} ${trailingNode?.right ? "mr-1" : ""} ${rest.type == "file" ? "file:mr-3 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-5.5 file:py-3" : ""}`}
            defaultValue={rest.type != "file" ? defaultValue : null}
            onInput={(e: any) => {
              handleInput(e);

              if (typeof onInput == "function") onInput(e);
            }}
            {...rest}
          />

          {trailingNode?.right ? trailingNode?.right : ""}
        </div>

        {(!status && warningNode) || warningText ? (
          <WarningText>{warningText ?? warningNode}</WarningText>
        ) : helpText ? (
          <HelpText>{helpText}</HelpText>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Input;
