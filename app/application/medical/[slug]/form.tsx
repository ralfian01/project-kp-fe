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

const findRejectedReasonByColumn = (
  rejectionArray: Array<any>,
  columnName: string,
) => {
  return rejectionArray.find((item: any) => {
    return item.column === columnName;
  });
};

export default function Form({
  applicantId,
  applicantData,
  provinces,
  banks,
  majorLevels,
}: {
  applicantId: number;
  applicantData: any;
  provinces: any;
  banks: any;
  majorLevels: any;
}) {
  // ## Regions
  const [regions, setRegions] = useState<any>({
    idCard: {
      province: provinces,
      city: null,
      district: null,
      village: null,
    },
    domicile: {
      province: provinces,
      city: null,
      district: null,
      village: null,
    },
  });

  const [isDomicileFillable, setIsDomicileFillable] = useState<Boolean>(true);
  const handleRegionChange = (name: string, value: any) => {
    switch (name) {
      case "id_card_province":
        const idCardCity = async () => {
          const { data } = await getCities({ province_id: value });

          const newRegion = { ...regions };
          newRegion.idCard.city = data;
          setRegions(newRegion);
        };

        return idCardCity();
      case "id_card_city":
        const idCardDistrict = async () => {
          const { data } = await getDistricts({ city_id: value });

          const newRegion = { ...regions };
          newRegion.idCard.district = data;
          setRegions(newRegion);
        };

        return idCardDistrict();
      case "id_card_district":
        const idCardVillage = async () => {
          const { data } = await getVillages({ district_id: value });

          const newRegion = { ...regions };
          newRegion.idCard.village = data;
          setRegions(newRegion);
        };

        return idCardVillage();

      case "domicile_province":
        const domicileCity = async () => {
          const { data } = await getCities({ province_id: value });

          const newRegion = { ...regions };
          newRegion.domicile.city = data;
          setRegions(newRegion);
        };

        return domicileCity();
      case "domicile_city":
        const domicileDistrict = async () => {
          const { data } = await getDistricts({ city_id: value });

          const newRegion = { ...regions };
          newRegion.domicile.district = data;
          setRegions(newRegion);
        };

        return domicileDistrict();
      case "domicile_district":
        const domicileVillage = async () => {
          const { data } = await getVillages({ district_id: value });

          const newRegion = { ...regions };
          newRegion.domicile.village = data;
          setRegions(newRegion);
        };

        return domicileVillage();
    }
  };

  useEffect(() => {
    const handleRegionDefaultValue = async () => {
      const regionKeys = [
        "id_card_province",
        "id_card_city",
        "id_card_district",
        "id_card_village",
        "domicile_province",
        "domicile_city",
        "domicile_district",
        "domicile_village",
      ];

      for (const keyName of Object.keys(applicantData.identity)) {
        if (regionKeys.indexOf(keyName) >= 0) {
          if (applicantData.identity[keyName]) {
            await handleRegionChange(keyName, applicantData.identity[keyName]);
          }
        }
      }
    };

    handleRegionDefaultValue();
  }, [
    applicantData.identity.id_card_province,
    applicantData.identity.id_card_city,
    applicantData.identity.id_card_district,
    applicantData.identity.id_card_village,
    applicantData.identity.domicile_province,
    applicantData.identity.domicile_city,
    applicantData.identity.domicile_district,
    applicantData.identity.domicile_village,
  ]);

  const [coordinate, setCoordinate] = useState<any>({
    long: applicantData.identity?.coor_long,
    lat: applicantData.identity?.coor_lat,
  });

  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<any>(null);
  const router = useRouter();

  const { send, response } = useUpdateApplicant();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = removeNullValue({
      full_name: form.full_name?.value,
      phone_number: form.phone_number ? `62${form.phone_number?.value}` : null,
      id_card_number: form.id_card_number?.value,
      id_card_province: form.id_card_province?.value,
      id_card_city: form.id_card_city?.value,
      id_card_district: form.id_card_district?.value,
      id_card_village: form.id_card_village?.value,
      id_card_postal_code: form.id_card_postal_code?.value,
      id_card_address: form.id_card_address?.value,
      id_card_as_domicile: form.id_card_as_domicile?.checked ? 1 : 0,
      domicile_province: form.domicile_province?.value,
      domicile_city: form.domicile_city?.value,
      domicile_district: form.domicile_district?.value,
      domicile_village: form.domicile_village?.value,
      domicile_postal_code: form.domicile_postal_code?.value,
      domicile_address: form.domicile_address?.value,
      family_card_number: form.family_card_number?.value,
      coor_lat: form.coor_lat?.value,
      coor_long: form.coor_long?.value,
      bank_name: form.bank_name?.value,
      bank_number: form.bank_number?.value,
      student_number: form.student_number?.value,
      university: form.university?.value,
      gpa: form.gpa?.value,
      major_level: form.major_level?.value,
      major_name: form.major_name?.value,
      science_type: form.science_type?.value,

      // Files
      pass_photo: form.pass_photo?.files[0],
      id_card_photo: form.id_card_photo?.files[0],
      family_card_photo: form.family_card_photo?.files[0],
      bank_book_photo: form.bank_book_photo?.files[0],
      student_card_photo: form.student_card_photo?.files[0],
      study_plan_card: form.study_plan_card?.files[0],
      study_result_card: form.study_result_card?.files[0],
      house_photo: form.house_photo?.files[0],
      scholarship: form.scholarship?.files[0],
      active_college: form.active_college?.files[0],
      pddikti: form.pddikti?.files[0],
      not_civil_servant: form.not_civil_servant?.files[0],
    });

    const formData = jsonToFormData(jsonPayload);

    send("general", applicantId, formData);

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
    <Container header={<ContainerTitle>Edit pemohon</ContainerTitle>}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Nama lengkap"
          type="text"
          placeholder="David Hamdani"
          className="w-full"
          name="full_name"
          helpText="Nama lengkap sesuai KTP"
          required={true}
          disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
          defaultValue={applicantData.identity?.full_name ?? ""}
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
          warningText={
            findRejectedReasonByColumn(applicantData.rejection, "full_name")
              ?.reason ?? ""
          }
        />

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Input
            label="Nomor telepon"
            type="number"
            placeholder="8123456789"
            className="w-full max-w-[250px]"
            name="phone_number"
            defaultValue={
              applicantData.identity?.phone_number.replace("62", "") ?? ""
            }
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            trailingNode={{ left: <div className="font-semibold">62</div> }}
            validationRules={{
              validNumber: (val: any) =>
                !/^8\d{9,15}$/.test(val)
                  ? "Penulisan nomor telepon tidak valid"
                  : "",
            }}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "phone_number",
              )?.reason ?? ""
            }
          />

          <Input
            label="Pas foto"
            type="file"
            accept="image/*,application/pdf"
            multiple={false}
            placeholder="Pas foto"
            className="w-full"
            name="pass_photo"
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.pass_photo ?? ""}
            validationRules={{
              format: (val: any) =>
                ["jpg", "jpeg", "png", "pdf"].indexOf(
                  val.split(".").at(-1).toLowerCase(),
                ) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "pass_photo")
                ?.reason ?? ""
            }
          />

          <Input
            label="NIK"
            type="number"
            placeholder="1234567890123456"
            className="w-full"
            name="id_card_number"
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.id_card_number ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "id_card_number",
              )?.reason ?? ""
            }
          />

          <Input
            label="Foto KTP"
            type="file"
            accept="image/*,application/pdf"
            multiple={false}
            placeholder="Pilih KTP"
            className="w-full"
            name="id_card_photo"
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.id_card_photo ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "id_card_photo",
              )?.reason ?? ""
            }
          />

          <Input
            label="Nomor Kartu Keluarga"
            type="number"
            placeholder="1234567890123456"
            className="w-full"
            name="family_card_number"
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.family_card_number ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "family_card_number",
              )?.reason ?? ""
            }
          />

          <Input
            label="Foto Kartu Keluarga"
            type="file"
            accept="image/*,application/pdf"
            multiple={false}
            placeholder="Pilih KTP"
            className="w-full"
            name="family_card_photo"
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.family_card_photo ?? ""}
            validationRules={{
              format: (val: any) =>
                ["jpg", "jpeg", "png", "pdf"].indexOf(
                  val.split(".").at(-1).toLowerCase(),
                ) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "family_card_photo",
              )?.reason ?? ""
            }
          />
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Alamat KTP</h2>

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Select
            label="Provinsi"
            placeholder="Pilih provinsi"
            options={
              regions.idCard.province
                ? regions.idCard.province?.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="id_card_province"
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.id_card_province ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "id_card_province",
              )?.reason ?? ""
            }
          />

          <Select
            label="Kota/kabupaten"
            placeholder="Pilih kota"
            options={
              regions.idCard.city
                ? regions.idCard.city.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="id_card_city"
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.id_card_city ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "id_card_city",
              )?.reason ?? ""
            }
          />

          <Select
            label="Kecamatan"
            placeholder="Pilih kecamatan"
            options={
              regions.idCard.district
                ? regions.idCard.district.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="id_card_district"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.id_card_district ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "id_card_district",
              )?.reason ?? ""
            }
          />

          <Select
            label="Desa"
            placeholder="Pilih desa"
            options={
              regions.idCard.village
                ? regions.idCard.village.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="id_card_village"
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.id_card_village ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "id_card_village",
              )?.reason ?? ""
            }
          />

          <Input
            label="Kode pos"
            type="text"
            placeholder="12345"
            maxLength={6}
            className="w-full max-w-[150px]"
            name="id_card_postal_code"
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.id_card_postal_code ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "id_card_postal_code",
              )?.reason ?? ""
            }
          />
        </div>

        <Textarea
          className="mt-4"
          name="id_card_address"
          label="Alamat KTP"
          placeholder="Jl. ABC No.14 Rt.007/Rw.01"
          disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
          defaultValue={applicantData.identity?.id_card_address ?? ""}
          warningText={
            findRejectedReasonByColumn(
              applicantData.rejection,
              "id_card_address",
            )?.reason ?? ""
          }
        />

        <Separator />

        <h2 className="text-lg font-semibold">Alamat Domisili</h2>

        <Toggle
          label="Alamat domisili sama dengan alamat KTP"
          className="mt-4"
          name="id_card_as_domicile"
          turnOn={false}
          onChange={(e: any) => {
            setIsDomicileFillable(!e.target.checked);
          }}
          disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
        />

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Select
            label="Provinsi domisili"
            placeholder="Pilih provinsi"
            options={
              regions.domicile.province
                ? regions.domicile.province?.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="domicile_province"
            disabled={
              ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0
                ? true
                : !isDomicileFillable
            }
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            defaultValue={applicantData.identity?.domicile_province ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "domicile_province",
              )?.reason ?? ""
            }
          />

          <Select
            label="Kota/kabupaten domisili"
            placeholder="Pilih kota"
            options={
              regions.domicile.city
                ? regions.domicile.city?.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="domicile_city"
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            disabled={
              ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0
                ? true
                : !isDomicileFillable
            }
            defaultValue={applicantData.identity?.domicile_city ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "domicile_city",
              )?.reason ?? ""
            }
          />

          <Select
            label="Kecamatan domisili"
            placeholder="Pilih kecamatan"
            options={
              regions.domicile.district
                ? regions.domicile.district?.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="domicile_district"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            disabled={
              ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0
                ? true
                : !isDomicileFillable
            }
            defaultValue={applicantData.identity?.domicile_district ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "domicile_district",
              )?.reason ?? ""
            }
          />

          <Select
            label="Desa domisili"
            placeholder="Pilih desa"
            options={
              regions.domicile.village
                ? regions.domicile.village?.map((item: any) => {
                    item.value = item.id;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="domicile_village"
            onInput={(e: any) =>
              handleRegionChange(e.target.name, e.target.value)
            }
            disabled={
              ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0
                ? true
                : !isDomicileFillable
            }
            defaultValue={applicantData.identity?.domicile_village ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "domicile_village",
              )?.reason ?? ""
            }
          />

          <Input
            label="Kode pos domisili"
            type="text"
            placeholder="12345"
            className="w-full max-w-[150px]"
            name="domicile_postal_code"
            disabled={
              ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0
                ? true
                : !isDomicileFillable
            }
            defaultValue={applicantData.identity?.domicile_postal_code ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "domicile_postal_code",
              )?.reason ?? ""
            }
          />
        </div>

        <Textarea
          className="mt-4"
          label="Alamat domisili"
          name="domicile_address"
          placeholder="Jl. ABC No.14 Rt.007/Rw.01"
          disabled={
            ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0
              ? true
              : !isDomicileFillable
          }
          defaultValue={applicantData.identity?.domicile_address ?? ""}
          warningText={
            findRejectedReasonByColumn(
              applicantData.rejection,
              "domicile_address",
            )?.reason ?? ""
          }
        />

        <h2 className="mt-5 text-lg font-semibold">Koordinat</h2>

        <div className="mt-4 grid grid-cols-3 items-end gap-3 gap-y-5">
          <Input
            label="Latitude"
            type="text"
            placeholder="123.123-12"
            className="w-full"
            name="coor_lat"
            readOnly={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={coordinate.lat ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "coor_lat")
                ?.reason ?? ""
            }
          />

          <Input
            label="Longitude"
            type="text"
            placeholder="123.123-12"
            className="w-full"
            name="coor_long"
            readOnly={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={coordinate.long ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "coor_long")
                ?.reason ?? ""
            }
          />

          <ButtonDefault
            label="Cek koordinat"
            className="mb-[1px] h-fit w-fit rounded-md bg-primary px-5 py-3 text-white"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined" && "geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setCoordinate({
                      lat: position.coords.latitude,
                      long: position.coords.longitude,
                    });
                  },
                  (err) => {
                    setErrors({
                      ...errors,
                      ...{
                        coor_lat: "Browser tidak mendukung koordinat",
                        coor_llong: "Browser tidak mendukung koordinat",
                      },
                    });
                  },
                );
              }
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
          />
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Bank</h2>

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Select
            label="Nama bank"
            placeholder="Pilih bank"
            options={
              banks
                ? banks?.map((item: any) => {
                    item.value = item.code;
                    item.label = item.name;

                    return item;
                  })
                : []
            }
            name="bank_name"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.bank_name ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "bank_name")
                ?.reason ?? ""
            }
          />

          <Input
            label="Nomor rekening"
            type="text"
            placeholder="123456789"
            className="w-full"
            name="bank_number"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.bank_number ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "bank_number")
                ?.reason ?? ""
            }
          />

          <Input
            label="Foto buku rekening"
            type="file"
            accept="image/*,application/pdf"
            multiple={false}
            placeholder="Upload foto buku rekening"
            className="w-full"
            name="bank_book_photo"
            validationRules={{
              format: (val: any) =>
                ["jpg", "jpeg", "png", "pdf"].indexOf(
                  val.split(".").at(-1).toLowerCase(),
                ) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.identity?.bank_book_photo ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "bank_book_photo",
              )?.reason ?? ""
            }
          />
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Pendidikan</h2>

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Input
            label="Nomor Induk Mahasiswa"
            type="number"
            placeholder="1234567890123456"
            className="w-full"
            name="student_number"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.student_number ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "student_number",
              )?.reason ?? ""
            }
          />

          <Input
            label="Foto Kartu Tanda Mahasiswa"
            type="file"
            accept="image/*,application/pdf"
            multiple={false}
            placeholder="Upload foto KTM"
            className="w-full"
            name="student_card_photo"
            validationRules={{
              format: (val: any) =>
                ["jpg", "jpeg", "png", "pdf"].indexOf(
                  val.split(".").at(-1).toLowerCase(),
                ) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.student_card_photo ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "student_card_photo",
              )?.reason ?? ""
            }
          />

          <Select
            label="Strata"
            placeholder="Pilih strata"
            options={
              majorLevels
                ? majorLevels?.map((item: any) => {
                    item.value = item.id;
                    item.label = item.major_name;

                    return item;
                  })
                : []
            }
            name="major_level"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.major_level?.id ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "major_level")
                ?.reason ?? ""
            }
          />

          <Input
            label="Universitas"
            type="text"
            placeholder="Universitas ABC"
            className="w-full"
            name="university"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.university ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "university")
                ?.reason ?? ""
            }
          />

          <Input
            label="Jurusan"
            type="text"
            placeholder="Teknik"
            className="w-full"
            name="major_name"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.major_name ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "major_name")
                ?.reason ?? ""
            }
          />

          <div></div>

          <div>
            <RadioButtonGroup
              name="science_type"
              variant={RadioButtonVariant.BASIC}
              defaultValue={applicantData.student?.science_type}
              options={[
                {
                  label: "Eksak",
                  value: "EXACT",
                  disabled:
                    ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0,
                },
                {
                  label: "Non-eksak",
                  value: "NON-EXACT",
                  className: "mt-2",
                  disabled:
                    ["DRAFT", "REJECT"].indexOf(applicantData.status) < 0,
                },
              ]}
            />
          </div>

          <Input
            label="IPK"
            type="number"
            max={4.0}
            step={0.01}
            placeholder="4.0"
            className="w-full max-w-[100px]"
            name="gpa"
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
              max: (val: any) => (val > 4.0 ? "Maksimal 4.0" : ""),
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.gpa ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "gpa")
                ?.reason ?? ""
            }
          />

          <Input
            label="Kartu Rencana Studi"
            type="file"
            accept="application/pdf"
            multiple={false}
            placeholder="Upload KRS"
            className="w-full"
            name="study_plan_card"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.study_plan_card ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "study_plan_card",
              )?.reason ?? ""
            }
          />

          <Input
            label="Kartu Hasil Studi"
            type="file"
            accept="application/pdf"
            multiple={false}
            placeholder="Upload KHS"
            className="w-full"
            name="study_result_card"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.student?.study_result_card ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "study_result_card",
              )?.reason ?? ""
            }
          />
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Berkas</h2>

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Input
            label="Foto tempat tinggal"
            type="file"
            accept="image/*,application/pdf"
            multiple={false}
            placeholder="Upload foto tempat tinggal"
            className="w-full"
            name="house_photo"
            validationRules={{
              format: (val: any) =>
                ["jpg", "jpeg", "png", "pdf"].indexOf(
                  val.split(".").at(-1).toLowerCase(),
                ) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.house_photo ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "house_photo")
                ?.reason ?? ""
            }
          />

          <Input
            label="Lampiran surat permohonan beasiswa"
            type="file"
            accept="application/pdf"
            multiple={false}
            placeholder="Upload lampiran surat permohonan beasiswa"
            className="w-full"
            name="scholarship"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.scholarship ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "scholarship")
                ?.reason ?? ""
            }
          />

          <Input
            label="Lampiran surat pernyataan aktif kuliah"
            type="file"
            accept="application/pdf"
            multiple={false}
            placeholder="Upload Lampiran surat pernyataan aktif kuliah"
            className="w-full"
            name="active_college"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.active_college ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "active_college",
              )?.reason ?? ""
            }
          />

          <Input
            label="Print out PDDikti"
            type="file"
            accept="application/pdf"
            multiple={false}
            placeholder="Upload print out PDDikti"
            className="w-full"
            name="pddikti"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.pddikti ?? ""}
            warningText={
              findRejectedReasonByColumn(applicantData.rejection, "pddikti")
                ?.reason ?? ""
            }
          />

          <Input
            label="Surat pernyataan bukan PNS"
            type="file"
            accept="application/pdf"
            multiple={false}
            placeholder="Upload surat pernyataan bukan PNS"
            className="w-full"
            name="not_civil_servant"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
            disabled={["DRAFT", "REJECT"].indexOf(applicantData.status) < 0}
            defaultValue={applicantData.not_civil_servant ?? ""}
            warningText={
              findRejectedReasonByColumn(
                applicantData.rejection,
                "not_civil_servant",
              )?.reason ?? ""
            }
          />
        </div>

        <div className="mt-5 flex justify-end">
          {["DRAFT", "REJECT"].indexOf(applicantData.status) >= 0 ? (
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
          ) : (
            ""
          )}
        </div>
      </form>
    </Container>
  );
}
