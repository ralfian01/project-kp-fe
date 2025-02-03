import { CalculatorIcon } from "@heroicons/react/24/outline";
import flatpickr from "flatpickr";
import { useEffect } from "react";

interface DatePickerProps {
  className?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  value?: string | number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  label,
  placeholder,
  required = false,
  name,
  value,
}) => {
  useEffect(() => {
    // Init flatpickr
    flatpickr(".form-datepicker", {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M j, Y",
      prevArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });
  }, []);

  return (
    <div className={className}>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          placeholder={placeholder ?? "mm/dd/yyyy"}
          data-class="flatpickr-right"
          required={required}
          name={name ?? ""}
          value={value ?? ""}
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <CalculatorIcon style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
