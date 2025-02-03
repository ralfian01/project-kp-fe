"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import ContainerTitle from "@/components/Container/ContainerTitle";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import Toggle from "@/components/Forms/Toggle";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Separator from "@/components/common/Separator/Sepator";
import Textarea from "@/components/Forms/Textarea";
import RadioButtonGroup, {
  RadioButtonVariant,
} from "@/components/Forms/Radio/RadioButtonGroup";
import { getCities } from "@/server/regions/cities";
import { getDistricts } from "@/server/regions/districts";
import { getVillages } from "@/server/regions/villages";
import { useUpdateApplicant } from "@/hooks/useApplicant";
import { jsonToFormData, removeNullValue } from "@/helpers/object";
import { useUpdateEmployee } from "@/hooks/useEmployee";
import DeleteButton from "./_components/DeleteButton";

const findRevisedReasonByColumn = (
  rejectionArray: Array<any>,
  columnName: string,
) => {
  return rejectionArray.find((item: any) => {
    return item.column === columnName;
  });
};

export default function Form({
  employeeId,
  employeeData,
}: {
  employeeId: number;
  employeeData: any;
}) {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<any>(null);
  const router = useRouter();

  const { send, response } = useUpdateEmployee();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = removeNullValue({
      name: form.name?.value,
      status: form.status.checked,
    });

    const formData: any = jsonToFormData(jsonPayload);

    send(employeeId, formData);

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
    <Container header={<ContainerTitle>Edit data karyawan</ContainerTitle>}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Nama karyawan"
          type="text"
          placeholder="Rizdwan"
          className="w-full max-w-[500px]"
          name="name"
          defaultValue={employeeData?.name ?? ""}
          required={true}
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <Toggle
          label="Status aktif karyawan"
          name="status"
          className="mt-4"
          turnOn={employeeData?.status_active}
        />

        <DeleteButton employeeData={employeeData} />

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
