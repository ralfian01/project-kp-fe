"use client";
import React, { useEffect } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { useModalConfirm } from "@/components/Modal/useModalBox";
import { useRouter } from "next/navigation";
import { useProposeApplicant } from "@/hooks/useApplicant";

type Props = {
  applicantData: any;
};

const ProposeButton: React.FC<Props> = ({ applicantData }) => {
  const { send: proposeApplicant, response } = useProposeApplicant();
  const { element: modalBoxElement, show: showModal } = useModalConfirm();
  const router = useRouter();

  // ## Propose applicant
  const handlePropose = () => {
    showModal({
      title: "Ajukan data pemohon?",
      description: "Data Pemohon akan masuk ke daftar pengajuan",
      buttons: {
        confirm: {
          label: "Ajukan",
          action: () => {
            proposeApplicant("general", applicantData.applicant_id);
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
        label="Ajukan"
        onClick={handlePropose}
        className="mx-1 w-full rounded-md bg-green px-3 py-1 text-sm text-white"
      />

      {modalBoxElement}
    </>
  );
};

export default ProposeButton;
