"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import ContainerTitle from "@/components/Container/ContainerTitle";
import Input from "@/components/Forms/Input";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { jsonToFormData, removeNullValue } from "@/helpers/object";
import DeleteButton from "./_components/DeleteButton";
import { urlAsset } from "@/helpers/url";
import { useUpdateProduct } from "@/hooks/useProduct";

export default function Form({
  productId,
  productData,
}: {
  productId: number;
  productData: any;
}) {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<any>(null);
  const router = useRouter();

  const { send, response } = useUpdateProduct();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = removeNullValue({
      name: form.name?.value,
      weight: form.weight?.value,
      expired_duration: form.expired_duration?.value,
      image_url: form.image_url?.value,

      image: form.image?.files[0],
    });

    const formData: any = jsonToFormData(jsonPayload);

    send(productId, formData);

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
    <Container header={<ContainerTitle>Edit data produk</ContainerTitle>}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Nama produk"
          type="text"
          placeholder="Produk AAA"
          className="w-full max-w-[500px]"
          name="name"
          defaultValue={productData?.name ?? ""}
          required={true}
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <div className="item-start mt-4 flex w-full max-w-[600px] gap-3">
          <Input
            label="Berat"
            type="number"
            placeholder="200"
            className="w-full"
            name="weight"
            required={true}
            defaultValue={productData?.weight ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            trailingNode={{
              right: <span className="w-fit font-semibold">gram</span>,
            }}
          />
          <Input
            label="Durasi expired"
            type="number"
            placeholder="115"
            className="w-full"
            name="expired_duration"
            required={true}
            defaultValue={productData?.expired_duration ?? ""}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            trailingNode={{
              right: <span className="w-fit font-semibold">hari</span>,
            }}
          />
        </div>

        <div className="mt-4 flex w-full items-start gap-3">
          <div className="w-full">
            <Input
              label="Upload foto produk"
              type="file"
              accept="image/*"
              placeholder="Foto produk"
              className="w-full max-w-[500px]"
              name="image"
              validationRules={{
                format: (val: any) =>
                  ["jpg", "jpeg", "pdf"].indexOf(
                    val.split(".").at(-1).toLowerCase(),
                  ) < 0
                    ? "Format file tidak valid"
                    : "",
              }}
            />

            <Input
              label="Atau masukan url foto produk"
              type="text"
              placeholder="https://my_link.com/photo.jpg"
              className="mt-4 w-full max-w-[500px]"
              name="image_url"
              defaultValue={urlAsset(productData?.image ?? "")}
            />
          </div>

          <div className="w-full">
            <img
              src={urlAsset(productData?.image ?? "")}
              className="h-[200px] w-[200px] rounded-md border border-gray-400 object-cover object-center"
            />
          </div>
        </div>

        <DeleteButton productData={productData} />

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
