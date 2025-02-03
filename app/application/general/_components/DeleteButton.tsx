"use client";
import React, { useEffect } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useModalConfirm } from "@/components/Modal/useModalBox";
import { useDeleteMasterDataAllocation } from "@/hooks/useMasterData";
import { useRouter } from "next/navigation";

type Props = {
  applicantData: any;
};

const DeleteButton: React.FC<Props> = ({ applicantData }) => {
  const { send: deleteData, response } = useDeleteMasterDataAllocation();
  const { element: modalBoxElement, show: showModal } = useModalConfirm();
  const router = useRouter();

  // ## Delete allocation
  const handleDelete = () => {
    showModal({
      title: "Hapus pemohon?",
      description: "Data Pemohon akan dihapus dari database",
      buttons: {
        confirm: {
          label: "Hapus",
          action: () => {
            deleteData("general", applicantData.id);
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
        className="mx-1 w-full rounded-md bg-red px-3 py-1 text-sm text-white"
      >
        <TrashIcon style={{ height: "15px" }} />
      </ButtonDefault>

      {modalBoxElement}
    </>
  );
};

export default DeleteButton;
