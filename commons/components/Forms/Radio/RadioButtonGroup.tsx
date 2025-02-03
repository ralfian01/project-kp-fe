"use client";
import { useEffect, useState } from "react";
import RadioButtonBasic from "./RadioButtonBasic";

export enum RadioButtonVariant {
  BASIC = "RadioButton",
  ROUNDED = "",
}

export type RadioElementProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: any;
  checked?: boolean;
  helpText?: any;
  validationRules?: any;
  onChange?: (...e: any) => any;
  variant?: RadioButtonVariant;
};

const RadioElement = (props: RadioElementProps) => {
  switch (props.variant) {
    case RadioButtonVariant.BASIC:
      return <RadioButtonBasic {...props} />;
      break;
    case RadioButtonVariant.ROUNDED:
      return <></>;
  }
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  name?: string;
  options?: Array<RadioElementProps>;
  variant: RadioButtonVariant;
  defaultValue?: any;
};

const RadioButtonGroup: React.FC<Props> = ({
  className,
  name,
  variant,
  options,
  defaultValue,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  rest = { ...rest, ...{ name } };

  return (
    <>
      {options?.map((item: any, key: number) => (
        <RadioElement
          variant={variant}
          key={key}
          {...item}
          onChange={(e: any) => {
            e.target.checked ? setSelectedValue(item.value) : "";

            if (typeof item.onChange == "function") item.onChange(e);
          }}
          checked={selectedValue == item.value}
          {...rest}
        />
      ))}
    </>
  );
};

export default RadioButtonGroup;
