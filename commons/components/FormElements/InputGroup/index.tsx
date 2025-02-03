import React from "react";

interface InputGroupProps {
  className?: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  label,
  type,
  placeholder,
  required,
  name,
}) => {
  return (
    <>
      <div className={className}>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="ml-1 font-semibold text-red">*</span>}
        </label>
        <input
          type={type}
          name={name ?? ""}
          placeholder={placeholder ?? ""}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
      </div>
    </>
  );
};

export default InputGroup;
