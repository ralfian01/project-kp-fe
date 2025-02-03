import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import ReactDOM from "react-dom";
import ButtonDefault from "../Buttons/ButtonDefault";

type Props = {
  className?: string;
  title: string;
  description?: string;
  buttons?: {
    confirm: {
      label: string;
      action: () => void;
    };
    cancel?: {
      label?: string;
      action?: () => void;
    };
  };
  onClose?: () => void;
};

const ModalConfirm: React.FC<Props> = ({
  className,
  title,
  description,
  buttons,
  onClose,
}) => {
  const handleClose = () => {
    if (typeof onClose == "function") {
      onClose();
    }

    if (
      buttons?.cancel?.action &&
      typeof buttons?.cancel?.action == "function"
    ) {
      buttons?.cancel?.action();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed left-0 top-0 z-[99999999] flex h-full w-full items-center justify-center overflow-auto bg-[rgba(0,0,0,0.6)] duration-[300ms]`}
      >
        <div
          className={`mx-auto block w-full max-w-[400px] rounded-md bg-white p-4 duration-[150ms]`}
        >
          <div className="text-center text-xl font-semibold">{title}</div>
          {description ? (
            <div className="text-ms mt-4 text-center">{description}</div>
          ) : (
            ""
          )}

          {buttons ? (
            <div className="mt-4 flex items-stretch justify-between">
              <ButtonDefault
                label={buttons?.confirm?.label}
                onClick={buttons?.confirm?.action}
                className="mx-1 w-full rounded-md border-[2px] border-primary bg-white px-5 py-2 text-primary"
              />

              <ButtonDefault
                label={buttons?.cancel?.label ?? "Batalkan"}
                onClick={handleClose}
                className="mx-1 w-full rounded-md border-[2px] border-red bg-red px-5 py-2 text-white"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ModalConfirm;
