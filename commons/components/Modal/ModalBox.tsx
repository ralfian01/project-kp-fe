import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import ReactDOM from "react-dom";

type Props = {
  className?: string;
  title: string;
  description?: string;
  onClose?: () => void;
};

const ModalBox: React.FC<Props> = ({
  className,
  title,
  description,
  onClose,
}) => {
  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed left-0 top-0 z-[99999999] h-full w-full bg-[rgba(0,0,0,0.6)] duration-[300ms]`}
      >
        <div
          className={`mx-auto block w-full max-w-[400px] rounded-md bg-white duration-[150ms]`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="text-lg font-semibold text-gray-7">{title}</div>
            <button onClick={onClose}>
              <XMarkIcon style={{ height: "20px", strokeWidth: "3px" }} />
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ModalBox;
