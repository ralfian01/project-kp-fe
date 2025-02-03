"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import ContainerTitle from "@/components/Container/ContainerTitle";
import Input from "@/components/Forms/Input";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { jsonToFormData, removeNullValue } from "@/helpers/object";
import { useInsertSchedule } from "@/hooks/useSchedule";
import Select from "@/components/Forms/Select";
import { useFetchManageProduct } from "@/hooks/useProduct";
import { urlAsset } from "@/helpers/url";
import RadioButtonGroup, {
  RadioButtonVariant,
} from "@/components/Forms/Radio/RadioButtonGroup";
import { useFetchManageMachine } from "@/hooks/useMachine";
import { useFetchManageEmployee } from "@/hooks/useEmployee";
import Checkbox from "@/components/Forms/Checkbox";

export default function Form() {
  const { fetch: fetchProduct, response: responseProduct } =
    useFetchManageProduct();

  const { fetch: fetchMachine, response: responseMachine } =
    useFetchManageMachine();

  const { fetch: fetchEmployee, response: responseEmployee } =
    useFetchManageEmployee();

  const [selectedEmployees, setSelectedEmployees] = useState<Array<any>>([]);

  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef(null);
  const router = useRouter();

  const { send, response } = useInsertSchedule();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = removeNullValue({
      production_date: form.production_date?.value,
      expired_date: form.expired_date?.value,
      shift_code: form.shift_code?.value,
      product_id: form.product_id?.value,
      machine_id: form.machine_id?.value,
      employee_ids: selectedEmployees,
    });

    send(jsonPayload);

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
        // switch (response?.report_id) {
        //   case "MBGI2":
        //     setErrors({
        //       ...errors,
        //       ...{
        //         period_start: "Tanggal periode sudah digunakan",
        //         period_end: "Tanggal periode sudah digunakan",
        //       },
        //     });
        //     break;
        // }
      }
    }

    setSubmitStatus(false);
  }, [response]);

  return (
    <Container header={<ContainerTitle>Tambah data jadwal</ContainerTitle>}>
      <form ref={formRef} onSubmit={handleSubmit}>
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

        <Select
          className="mt-4 w-full max-w-[500px]"
          label="Shift"
          placeholder="Pilih shift"
          options={[
            { label: "Shift 1", value: 1 },
            { label: "Shift 2", value: 2 },
            { label: "Shift 3", value: 3 },
          ]}
          name="shift_code"
        />

        {/* Select product - begin */}
        <div className="mt-4 w-full">
          <Input
            label="Produk yang diproduksi"
            type="text"
            placeholder="Cari nama produk"
            className="w-full"
            onInput={(e) => {
              e.preventDefault();
              const value = e.target.value;

              fetchProduct({
                name: value,
              });
            }}
          />

          <div className="mt-4 w-full rounded-md border border-gray-400 p-3 py-0">
            {responseProduct ? (
              <RadioButtonGroup
                variant={RadioButtonVariant.BASIC}
                name="product_id"
                options={responseProduct.map((item: any, key: number) => ({
                  label: (
                    <div key={key} className="flex items-start py-3">
                      <img
                        src={urlAsset(item.image)}
                        className="h-[50px] w-[50px] object-cover object-center"
                      />

                      <div className="ml-1 w-full text-sm">
                        {item.name}
                        <div className="mt-1">
                          Varian:{" "}
                          <span className="font-semibold">{item.weight}gr</span>
                        </div>
                      </div>
                    </div>
                  ),
                  value: item.id,
                }))}
              />
            ) : (
              "Produk tidak ditemukan, silakan cari produk lain"
            )}
          </div>
        </div>
        {/* Select product - end */}

        {/* Select machine - begin */}
        <div className="mt-4 w-full max-w-[500px]">
          <Input
            label="Mesin"
            type="text"
            placeholder="Cari kode mesin"
            className="w-full"
            onInput={(e) => {
              e.preventDefault();
              const value = e.target.value;

              fetchMachine({
                name: value,
              });
            }}
          />

          <div className="mt-4 w-full rounded-md border border-gray-400 p-3 py-0">
            {responseMachine ? (
              <RadioButtonGroup
                variant={RadioButtonVariant.BASIC}
                name="machine_id"
                options={responseMachine.map((item: any, key: number) => ({
                  label: (
                    <div key={key} className="flex items-start py-3">
                      <div className="ml-1 w-full text-sm">
                        {item.name}
                        <div className="mt-1">
                          Kode mesin:{" "}
                          <span className="font-semibold">{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ),
                  value: item.id,
                }))}
              />
            ) : (
              "Mesin tidak ditemukan, silakan cari mesin lain"
            )}
          </div>
        </div>
        {/* Select machine - begin */}

        {/* Select employee - begin */}
        <div className="mt-4 w-full max-w-[500px]">
          <Input
            label="Staff"
            type="text"
            placeholder="Cari staff"
            className="w-full"
            onInput={(e) => {
              e.preventDefault();
              const value = e.target.value;

              fetchEmployee({
                name: value,
              });
            }}
          />

          <div className="mt-4 w-full rounded-md border border-gray-400 p-3 py-0">
            {responseEmployee
              ? responseEmployee.map((item: any, key: number) => (
                  <div key={item.id} className="flex items-center py-3">
                    <Checkbox
                      label=""
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (!selectedEmployees.includes(item.id)) {
                            selectedEmployees.push(item.id);
                          }
                        } else {
                          selectedEmployees.splice(
                            selectedEmployees.indexOf(item.id),
                            1,
                          );
                        }
                      }}
                      name="employee_id"
                      value={item.id}
                      checked={selectedEmployees.includes(item.id)}
                    />

                    <div className="ml-1 w-full text-sm">
                      {item.name}
                      <div className="mt-1">
                        ID:
                        <span className="font-semibold">{item.id}</span>
                      </div>
                    </div>
                  </div>
                ))
              : "Staff tidak ditemukan, silakan cari staff lain"}
          </div>
        </div>
        {/* Select machine - begin */}

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
