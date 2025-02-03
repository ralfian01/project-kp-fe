"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import ContainerTitle from "@/components/Container/ContainerTitle";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useUpdateMasterData } from "@/hooks/useMasterData";
import { useRouter } from "next/navigation";
import {
  complainCategoryOptions,
  complainProductStatus,
  complainReceiveMedia,
} from "@/constants/complaints";
import Textarea from "@/components/Forms/Textarea";
import RadioButtonGroup, {
  RadioButtonVariant,
} from "@/components/Forms/Radio/RadioButtonGroup";
import { urlAsset } from "@/helpers/url";
import { useFetchManageProduct } from "@/hooks/useProduct";
import { useUpdateComplain } from "@/hooks/useComplain";

export default function Form({
  complainId,
  complainData,
}: {
  complainId: any;
  complainData?: any;
}) {
  const { fetch: fetchProduct, response: responseProduct } =
    useFetchManageProduct();

  const [submitStatus, setSubmitStatus] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  const { send, response } = useUpdateComplain();
  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = {
      complain_number: form.complain_number?.value,
      expired_code: `${form.expired_code_a?.value}-${form.expired_code_b?.value}`,
      complain_category: form.complain_category?.value,
      description: form.description?.value,
      receive_media: form.receive_media?.value,
      complain_date: form.complain_date?.value,
      product_status: form.product_status?.value,
      product_id: form.product_id?.value ?? complainData?.product?.id,

      // Files
      evidence_file: form.evidence_file?.files[0],
    };

    send(complainId, jsonPayload);

    setTimeout(() => {
      setSubmitStatus(false);
    }, 5000);
  };

  useEffect(() => {
    if (response?.code == 200) {
      setSubmitStatus(false);
      router.back();

      setTimeout(() => {
        router.refresh();
      }, 150);
    } else if (response?.code == 400) {
      router.refresh();
    }
  }, [response]);

  return (
    <Container header={<ContainerTitle>Edit data</ContainerTitle>}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mt-4 flex w-full items-center gap-3">
          <Input
            label="Nomor keluhan"
            type="text"
            placeholder="89132"
            className="w-full"
            name="complain_number"
            required={true}
            disabled={true}
            defaultValue={complainData?.complain_number ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />
          <Input
            label="Tanggal keluhan"
            type="date"
            placeholder=""
            className="w-full"
            name="complain_date"
            required={true}
            disabled={true}
            defaultValue={complainData?.complain_date ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />
        </div>

        {/* Select product - begin */}
        <div className="mt-4 w-full">
          <Input
            label="Produk yang dikomplain"
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

          <div className="mt-4 block rounded-lg border border-blue-500 bg-blue-50 p-2 px-4">
            <div className="font-md">Produk terpilih</div>

            <div className="flex items-start gap-3 py-3">
              <img
                src={urlAsset(complainData?.product?.image ?? "")}
                className="h-[50px] w-[50px] object-cover object-center"
              />

              <div className="ml-1 w-full text-sm">
                {complainData?.product?.name}
                <div className="mt-1">
                  Varian:{" "}
                  <span className="font-semibold">
                    {complainData?.product?.weight}gr
                  </span>
                </div>
              </div>
            </div>
          </div>

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

        <div className="mt-4 flex w-full max-w-[300px] items-center">
          <Input
            label="Kode expired"
            type="text"
            placeholder="20240122"
            className="w-full"
            name="expired_code_a"
            required={true}
            defaultValue={complainData?.expired_code?.split("-")[0] ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />
          <div className="font-bol mx-3 mt-6 w-full max-w-[10px] text-center text-3xl">
            -
          </div>
          <Input
            label=""
            type="text"
            placeholder="1"
            className="w-full max-w-[50px]"
            name="expired_code_b"
            required={true}
            defaultValue={complainData?.expired_code?.split("-")[1] ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />
        </div>

        <Select
          label="Kategori keluhan"
          placeholder="Pilih kategori"
          options={complainCategoryOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          name="complain_category"
          required={true}
          defaultValue={complainData?.complain_category ?? ""}
          className="mt-4"
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <Textarea
          label="Deskripsi komplain"
          placeholder="Tulis deskripsi komplain"
          name="description"
          required={true}
          defaultValue={complainData?.description ?? ""}
          className="mt-4"
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <div className="mt-4 flex w-full items-center gap-3">
          <Select
            label="Media penerimaan"
            placeholder="Pilih media"
            options={Object.keys(complainReceiveMedia).map((item) => ({
              label: complainReceiveMedia[item],
              value: item,
            }))}
            name="receive_media"
            required={true}
            defaultValue={complainData?.receive_media ?? ""}
            className=" w-full"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />

          <Select
            label="Status produk"
            placeholder="Pilih status"
            options={Object.keys(complainProductStatus).map((item) => ({
              label: complainProductStatus[item],
              value: item,
            }))}
            name="product_status"
            required={true}
            defaultValue={complainData?.product_status ?? ""}
            className=" w-full"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />
        </div>

        <Input
          label="File bukti komplain"
          type="file"
          placeholder="Upload file"
          className="mt-4 w-full"
          name="evidence_file"
          defaultValue={urlAsset(complainData?.evidence_file ?? "")}
        />

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
