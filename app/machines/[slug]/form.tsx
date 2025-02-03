"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import ContainerTitle from "@/components/Container/ContainerTitle";
import Input from "@/components/Forms/Input";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { jsonToFormData, removeNullValue } from "@/helpers/object";
import { useUpdateMachine } from "@/hooks/useMachine";

export default function Form({
  machineId,
  machineData,
}: {
  machineId: number;
  machineData: any;
}) {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<any>(null);
  const router = useRouter();

  const { send, response } = useUpdateMachine();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = removeNullValue({
      name: form.name?.value,
      code: form.code?.value,
    });

    const formData: any = jsonToFormData(jsonPayload);

    send(machineId, formData);

    setTimeout(() => {
      setSubmitStatus(false);
    }, 5000);
  };

  useEffect(() => {
    if (response?.code == 200) {
      router.back();

      setTimeout(() => {
        router.refresh();
      }, 150);
    } else if (response?.code == 400) {
      // router.refresh();
    } else if (response?.code == 409) {
      if (response?.report_id) {
        switch (response?.report_id) {
          case "":
            setErrors({
              ...errors,
              ...{},
            });
            break;
        }
      }
    }

    setSubmitStatus(false);
  }, [response]);

  return (
    <Container header={<ContainerTitle>Edit data mesin</ContainerTitle>}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="item-start flex w-full gap-3">
          <Input
            label="Nama mesin"
            type="text"
            placeholder="Mesin zzz"
            className="w-full"
            name="name"
            required={true}
            defaultValue={machineData?.name ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />

          <Input
            label="Kode mesin"
            type="text"
            placeholder="AX-123"
            className="w-full"
            name="code"
            required={true}
            defaultValue={machineData?.code ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />
        </div>

        <div className="mt-5 flex justify-end">
          <ButtonDefault
            label="Simpan"
            className="rounded-[5px] bg-primary px-4 py-[7px] text-white"
            loading={submitStatus}
          >
            <PaperAirplaneIcon
              className="font-semibold"
              style={{ height: "25px" }}
            />
          </ButtonDefault>
        </div>
      </form>
    </Container>
  );
}
