"use client";
import React, { useEffect } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useModalConfirm } from "@/components/Modal/useModalBox";
import { useRouter } from "next/navigation";
import { useDeleteMachine } from "@/hooks/useMachine";

type Props = {
  machineData: any;
};

const DeleteButton: React.FC<Props> = ({ machineData }) => {
  const { send: deleteData, response } = useDeleteMachine();
  const { element: modalBoxElement, show: showModal } = useModalConfirm();
  const router = useRouter();

  // ## Delete allocation
  const handleDelete = (e: any) => {
    e.preventDefault();

    showModal({
      title: "Hapus mesin?",
      description: "Data Machine akan dihapus dari database",
      buttons: {
        confirm: {
          label: "Hapus",
          action: () => {
            deleteData(machineData.id);
          },
        },
      },
    });
  };

  useEffect(() => {
    if (response?.code == 200) {
      router.refresh();
    }
  }, [response]);

  return (
    <>
      <ButtonDefault
        label=""
        onClick={handleDelete}
        className="w-full rounded-md bg-red px-3 py-1 text-white"
      >
        <TrashIcon style={{ height: "15px" }} />
      </ButtonDefault>

      {modalBoxElement}
    </>
  );
};

export default DeleteButton;
