import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useFormValidation from "./useFormValidation";
import HelpText from "./HelpText";
import WarningText from "./WarningText";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  label: string;
  placeholder?: string | number;
  options?: Array<any>;
  defaultValue?: any;
  helpText?: any;
  validationRules?: any;
  warningText?: any;
};

const Select: React.FC<Props> = ({
  className,
  label,
  placeholder,
  options,
  defaultValue,
  helpText,
  validationRules,
  warningText,
  ...rest
}) => {
  // ## Form Validation
  const { status, warningNode, validate } = useFormValidation(validationRules);

  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOption(defaultValue ?? rest.value ?? null);
  }, []);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleChange = (evt: any) => {
    validate(evt.target.value);
    setSelectedOption(evt.target.value);

    changeTextColor();
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
        <div className="relative z-20 bg-transparent dark:bg-dark-2">
          <select
            {...rest}
            name={rest.name}
            onChange={handleChange}
            className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary ${
              isOptionSelected ? "text-dark dark:text-white" : ""
            }`}
          >
            {placeholder ? (
              <option
                value=""
                disabled
                selected={selectedOption ? false : true}
                className="text-dark-6"
              >
                {placeholder}
              </option>
            ) : (
              ""
            )}
            {options
              ? options.map((item: any, key: number) => (
                  <option
                    key={key}
                    value={item.value}
                    disabled={item.disabled}
                    selected={item.value == selectedOption}
                    className="text-gray-800"
                  >
                    {item.label}
                  </option>
                ))
              : ""}
          </select>

          <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
            <ChevronDownIcon style={{ height: "15px" }} />
          </span>
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

export default Select;
