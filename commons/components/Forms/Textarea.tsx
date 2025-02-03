import React, { useEffect, useState } from "react";
import useFormValidation from "./useFormValidation";
import HelpText from "./HelpText";
import WarningText from "./WarningText";

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  label: string;
  helpText?: string;
  defaultValue?: any;
  validationRules?: any;
  warningText?: any;
};

const Textarea: React.FC<Props> = ({
  className,
  label,
  helpText,
  validationRules,
  warningText,
  defaultValue,
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
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          {label}
          {rest.required && (
            <span className="ml-1 font-semibold text-red">*</span>
          )}
        </label>
        <textarea
          className={`h-full w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
          {...rest}
          style={{ resize: "none" }}
          onInput={handleInput}
        >
          {defaultValue}
        </textarea>

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

export default Textarea;
