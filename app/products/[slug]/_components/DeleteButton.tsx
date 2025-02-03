"use client";
import React, { useEffect } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useModalConfirm } from "@/components/Modal/useModalBox";
import { useRouter } from "next/navigation";
import { useDeleteEmployee } from "@/hooks/useEmployee";
import { useDeleteProduct } from "@/hooks/useProduct";

type Props = {
  productData: any;
};

const DeleteButton: React.FC<Props> = ({ productData }) => {
  const { send: deleteData, response } = useDeleteProduct();
  const { element: modalBoxElement, show: showModal } = useModalConfirm();
  const router = useRouter();

  // ## Delete allocation
  const handleDelete = (e: any) => {
    e.preventDefault();

    showModal({
      title: "Hapus produk?",
      description: "Data Produk akan dihapus dari database",
      buttons: {
        confirm: {
          label: "Hapus",
          action: () => {
            deleteData(productData.id);
          },
        },
      },
    });
  };

  useEffect(() => {
    if (response?.code == 200) {
      router.back();

      setTimeout(() => {
        router.refresh();
      }, 150);
    }
  }, [response]);

  return (
    <>
      <ButtonDefault
        label="Hapus data produk"
        onClick={handleDelete}
        className="mt-7 w-fit rounded-[5px] bg-red px-4 py-[7px] text-white"
      >
        <TrashIcon style={{ height: "15px" }} />
      </ButtonDefault>

      {modalBoxElement}
    </>
  );
};

export default DeleteButton;
