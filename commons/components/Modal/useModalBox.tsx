import { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import ModalConfirm from "./ModalConfirm";

export const useModalBox = () => {
  const [element, setElement] = useState<any>(null);
  const [modalAttr, setModalAttr] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);

  const close = () => {
    setShowModal(false);
  };

  const show = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => {
    setModalAttr({ title, description });
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      setElement(<ModalBox {...modalAttr} onClose={close} />);
    } else {
      setElement(null);
    }
  }, [showModal]);

  return { element, show, close };
};

export const useModalConfirm = () => {
  const [element, setElement] = useState<any>(null);
  const [modalAttr, setModalAttr] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);

  const close = () => {
    setShowModal(false);
  };

  const show = ({
    title,
    description,
    buttons,
  }: {
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
  }) => {
    setModalAttr({ title, description, buttons });
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      setElement(<ModalConfirm {...modalAttr} onClose={close} />);
    } else {
      setElement(null);
    }
  }, [showModal]);

  return { element, show, close };
};
