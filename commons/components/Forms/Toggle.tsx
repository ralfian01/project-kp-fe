"use client";
import { useEffect, useState } from "react";
import useFormValidation from "./useFormValidation";
import HelpText from "./HelpText";
import WarningText from "./WarningText";

type ToggleProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  turnOn?: boolean;
  helpText?: any;
  validationRules?: any;
  onChange?: (...rest: any) => any;
};

const Toggle: React.FC<ToggleProps> = ({
  className,
  label,
  turnOn,
  helpText,
  validationRules,
  onChange,
  ...rest
}) => {
  // ## Form Validation
  const { status, warningNode } = useFormValidation(validationRules);

  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (turnOn) setEnabled(turnOn ?? false);
  }, [turnOn]);

  return (
    <div className={`grid w-fit grid-cols-2 gap-2 ${className}`}>
      <div className="block text-body-sm font-medium text-dark dark:text-white">
        {label}
      </div>

      <label
        htmlFor={rest.name}
        className="relative flex w-fit cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={rest.name}
            name={rest.name}
            className="sr-only"
            onChange={(e) => {
              setEnabled(e.target.checked);

              if (typeof onChange == "function") onChange(e);
            }}
            // defaultChecked={enabled}
            checked={enabled}
            {...rest}
          />
          <div className="block h-8 w-14 rounded-full bg-gray-3 dark:bg-[#5A616B]"></div>
          <div
            className={`shadow-Toggle-1 absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              enabled && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          ></div>
        </div>
      </label>

      {!status && warningNode ? (
        <WarningText>{warningNode}</WarningText>
      ) : helpText ? (
        <HelpText>{helpText}</HelpText>
      ) : (
        ""
      )}
    </div>
  );
};

export default Toggle;
