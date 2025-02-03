"use client";
import React, { useEffect, useRef, useState } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import Input from "@/components/Forms/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterAccount } from "@/hooks/useAuthentication";
import { getCities } from "@/server/regions/cities";
import Select from "@/components/Forms/Select";
import { removeNullValue } from "@/helpers/object";
import AlertSuccess from "@/components/Alerts/AlertSuccess";

export default function Form({ provinces }: { provinces: any }) {
  // ## Regions
  const [regions, setRegions] = useState<any>({
    provinces: provinces,
    cities: null,
  });

  const handleRegionChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "province_id":
        const province = async () => {
          const { data } = await getCities({ province_id: value });

          const newRegion = { ...regions };
          newRegion.cities = data;
          setRegions(newRegion);
        };

        return province();
    }
  };

  const [responseElement, setResponseElement] = useState<any>(null);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef(null);
  const router = useRouter();

  const { send, response } = useRegisterAccount();
  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setResponseElement(null);

    setErrors({});
    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = removeNullValue({
      email: form.email.value,
      full_name: form.full_name.value,
      phone_number: `62${form.phone_number.value}`,
      id_card_number: form.id_card_number.value,
      province_id: form.province_id.value,
      city_id: form.city_id.value,
    });

    send(jsonPayload);

    setTimeout(() => {
      setSubmitStatus(false);
    }, 5000);
  };

  useEffect(() => {
    if (response?.code == 200) {
      setResponseElement(
        <AlertSuccess
          title="Pendaftaran berhasil"
          description="Silakan cek email untuk melihat username dan password"
        />,
      );
    } else if (response?.code == 400) {
      router.refresh();
    } else if (response?.code == 409) {
      switch (response?.report_id) {
        case "RA1":
          setErrors({
            ...errors,
            ...{
              email: "Email sudah digunakan",
            },
          });
          break;
        case "RA2":
          setErrors({
            ...errors,
            ...{
              id_card_number: "NIK sudah digunakan",
            },
          });
          break;
        case "RA3":
          setErrors({
            ...errors,
            ...{
              phone_number: "Nomor telepon sudah digunakan",
            },
          });
          break;
        case "RA6":
          setErrors({
            ...errors,
            ...{
              province_id: "Provinsi yang Anda pilih tidak tersedia",
              city_id: "Kota yang Anda pilih tidak tersedia",
            },
          });
          break;
      }
    }

    setSubmitStatus(false);
  }, [response]);

  return (
    <>
      {responseElement ? (
        responseElement
      ) : (
        <form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="text"
            placeholder="user@mail.com"
            className="w-full"
            name="email"
            required={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            warningText={errors.email ?? null}
          />

          <Input
            label="Nama lengkap"
            type="text"
            placeholder="David Hamdani"
            className="mt-4 w-full"
            name="full_name"
            required={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            warningText={errors.full_name ?? null}
          />

          <Input
            label="Nomor telepon"
            type="number"
            placeholder="8123456789"
            className="mt-4 w-full"
            required={true}
            name="phone_number"
            trailingNode={{ left: <div className="font-semibold">62</div> }}
            validationRules={{
              validNumber: (val: any) =>
                !/^8\d{9,15}$/.test(val)
                  ? "Penulisan nomor telepon tidak valid"
                  : "",
            }}
            warningText={errors.phone_number ?? null}
          />

          <Input
            label="NIK"
            type="number"
            placeholder="1234567890123456"
            className="mt-4 w-full"
            name="id_card_number"
            required={true}
            warningText={errors.id_card_number ?? null}
          />

          <Select
            label="Provinsi"
            placeholder="Pilih provinsi"
            className="mt-4 w-full"
            options={
              regions.provinces
                ? regions.provinces?.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="province_id"
            onInput={handleRegionChange}
            warningText={errors.province_id ?? null}
          />

          <Select
            label="Kota/kabupaten"
            placeholder="Pilih kota"
            className="mt-4 w-full"
            options={
              regions.cities
                ? regions.cities.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="city_id"
            warningText={errors.city_id ?? null}
          />

          <ButtonDefault
            label="Daftar"
            className="mt-4 w-full rounded-[5px] bg-primary px-4 py-[7px] text-white"
            loading={submitStatus}
          />

          <div className="mt-3   text-center">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="font-semibold text-primary">
              Login sekarang
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
