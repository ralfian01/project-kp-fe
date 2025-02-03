import React from "react";
import Link from "next/link";

type ButtonPropTypes = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  link?: string;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

const ButtonDefault = ({
  label,
  link,
  className,
  children,
  loading,
  disabled,
  ...rest
}: ButtonPropTypes) => {
  if (loading) disabled = loading;

  return (
    <>
      {link ? (
        <Link
          className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${className}`}
          href={link ?? ""}
        >
          {children}
          {label}
        </Link>
      ) : (
        <button
          className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${disabled ? "bg-gray-400" : "cursor-pointer"} ${className}`}
          {...rest}
          value={rest.value}
          name={rest.name}
          disabled={disabled}
        >
          {loading ? (
            <div className="relative h-full w-[20px]">
              <svg
                className="absolute h-full w-[20px] animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
              </svg>
            </div>
          ) : (
            children
          )}
          {label}
        </button>
      )}
    </>
  );
};

export default ButtonDefault;
