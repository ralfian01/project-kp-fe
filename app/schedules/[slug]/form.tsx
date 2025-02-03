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
  scheduleId,
  scheduleData,
}: {
  scheduleId: number;
  scheduleData: any;
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

    send(scheduleId, formData);

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
    <Container
      className="max-w-[500px]"
      header={<ContainerTitle>Edit data mesin</ContainerTitle>}
    >
      <div className="block">
        <div className="item-start mt-4 flex w-full gap-3">
          <Input
            label="Tanggal produksi"
            type="date"
            placeholder="Tanggal produksi"
            className="w-full"
            name="production_date"
            required={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />

          <Input
            label="Tanggal expired"
            type="date"
            placeholder="Tanggal expired"
            className="w-full"
            name="expired_date"
            required={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />
        </div>
      </div>
    </Container>
  );
}
