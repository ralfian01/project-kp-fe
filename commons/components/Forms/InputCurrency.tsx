import { formatToRupiah } from "@/helpers/number";
import React, { useEffect, useState } from "react";
import HelpText from "./HelpText";
import WarningText from "./WarningText";
import useFormValidation from "./useFormValidation";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  helpText?: any;
  validationRules?: any;
  defaultValue?: any;
  name?: string;
  placeholder?: any;
  warningText?: any;
};

const InputCurrency: React.FC<Props> = ({
  className,
  label,
  helpText,
  validationRules,
  defaultValue,
  name,
  placeholder,
  warningText,
  ...rest
}) => {
  // ## Form Validation
  const { status, warningNode, validate } = useFormValidation(validationRules);

  const [valueNumber, setValueNumber] = useState<any>(null);
  const [valueCurrency, setValueCurrency] = useState<any>(null);
  const [placeholderCurrency, setPlaceholderCurrency] = useState<any>(null);

  useEffect(() => {
    // ### Value format to currency
    if (defaultValue || rest.value) {
      const value = Number(defaultValue ?? rest.value);
      if (!isNaN(value)) {
        setValueCurrency(formatToRupiah(value));
        setValueNumber(value);
      }
    }

    // ### Placeholder format to currency
    if (placeholder) {
      const placeholderNumber = Number(placeholder);

      if (!isNaN(placeholderNumber)) {
        setPlaceholderCurrency(formatToRupiah(placeholderNumber));
      }
    }
  }, [defaultValue, placeholder]);

  // console.log(placeholderCurrency);

  const handleInput = (evt: any) => {
    evt.preventDefault();

    const value = Number(
      evt.target.value.replace(/[^0-9.]/g, "").replace(/(\.*?)\.*/g, "$1"),
    );

    validate(value);

    if (value) {
      // ### Format value to currency and number
      setValueCurrency(formatToRupiah(value));
      setValueNumber(value);
    } else {
      setValueCurrency("");
      setValueNumber("");
    }
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
        <input
          type="number"
          name={name}
          style={{ display: "none" }}
          value={valueNumber}
        />
        <input
          type="text"
          name={`${name}-currency`}
          pattern="[0-9.]*"
          placeholder={placeholderCurrency ?? ""}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          onInput={handleInput}
          value={valueCurrency}
          {...rest}
        />

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

export default InputCurrency;
