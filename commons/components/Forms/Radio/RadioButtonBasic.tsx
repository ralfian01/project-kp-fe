"use client";
import { useEffect, useState } from "react";
import useFormValidation from "../useFormValidation";
import HelpText from "../HelpText";
import WarningText from "../WarningText";
import { RadioElementProps } from "./RadioButtonGroup";

type Props = RadioElementProps;

const RadioButtonBasic: React.FC<Props> = ({
  className,
  label,
  checked = false,
  helpText,
  validationRules,
  onChange,
  ...rest
}) => {
  // ## Form Validation
  const { status, warningNode } = useFormValidation(validationRules);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (checked) setIsChecked(checked ?? false);
  }, [checked]);

  return (
    <>
      <div className={`flex w-fit ${className ?? ""}`}>
        <label
          className="input-radio-basic relative flex w-fit cursor-pointer select-none items-center"
          htmlFor={`${rest.name}-${rest.value}`}
        >
          <input
            type="radio"
            id={`${rest.name}-${rest.value}`}
            name={rest.name}
            style={{
              display: "none",
            }}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              if (typeof onChange == "function") onChange(e);
            }}
            defaultChecked={checked}
            {...rest}
          />

          <div
            className={`radio-button mr-[10px] flex h-5 w-5 items-center justify-center rounded-full border p-[4px] ${
              isChecked
                ? "border-primary bg-gray-2 dark:bg-transparent"
                : "border border-dark-5 dark:border-dark-6"
            }`}
          >
            <span
              className={`radio-thumb opacity-0 ${isChecked && "!opacity-100"} h-full w-full rounded-full bg-primary`}
            >
              &nbsp;
            </span>
          </div>

          <div className="block text-body-sm font-medium text-dark dark:text-white">
            {label}
          </div>
        </label>
      </div>

      {!status && warningNode ? (
        <WarningText>{warningNode}</WarningText>
      ) : helpText ? (
        <HelpText>{helpText}</HelpText>
      ) : (
        ""
      )}
    </>
  );
};

export default RadioButtonBasic;
