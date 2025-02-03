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
import { useInsertApplicant } from "@/hooks/useApplicant";
import { jsonToFormData, removeNullValue } from "@/helpers/object";

export default function Form({
  provinces,
  banks,
  majorLevels,
}: {
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

  //   const {data}

  const [isDomicileFillable, setIsDomicileFillable] = useState<Boolean>(true);
  const handleRegionChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

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

  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef(null);
  const router = useRouter();

  const { send, response } = useInsertApplicant();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    setSubmitStatus(true);

    const form = evt.target;
    const jsonPayload = removeNullValue({
      recommender_name: form.recommender_name?.value,
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
      bank_number: form?.bank_number.value,
      student_number: form.student_number?.value,
      university: form.university?.value,
      gpa: form.gpa?.value,
      major_level: form.major_level?.value,
      major_name: form.major_name?.value,
      science_type: form.science_type?.value ?? null,

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

    send("general", formData);

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
          case "MBGI2":
            setErrors({
              ...errors,
              ...{
                period_start: "Tanggal periode sudah digunakan",
                period_end: "Tanggal periode sudah digunakan",
              },
            });
            break;
        }
      }
    }

    setSubmitStatus(false);
  }, [response]);

  return (
    <Container header={<ContainerTitle>Tambah pemohon</ContainerTitle>}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Nama pokir"
          type="text"
          placeholder="Rizdwan"
          className="w-full"
          name="recommender_name"
          required={true}
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <Input
          label="Nama lengkap"
          type="text"
          placeholder="David Hamdani"
          className="mt-4 w-full"
          name="full_name"
          helpText="Nama lengkap sesuai KTP"
          required={true}
          validationRules={{
            required: (val: any) => (!val ? "Wajib diisi" : ""),
          }}
        />

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Input
            label="Nomor telepon"
            type="number"
            placeholder="8123456789"
            className="w-full max-w-[250px]"
            name="phone_number"
            trailingNode={{ left: <div className="font-semibold">62</div> }}
            validationRules={{
              validNumber: (val: any) =>
                !/^8\d{9,15}$/.test(val)
                  ? "Penulisan nomor telepon tidak valid"
                  : "",
            }}
          />

          <Input
            label="Pas foto"
            type="file"
            accept="image/*,application/pdf"
            placeholder="Pas foto"
            className="w-full"
            name="pass_photo"
            validationRules={{
              format: (val: any) =>
                ["jpg", "jpeg", "png", "pdf"].indexOf(
                  val.split(".").at(-1).toLowerCase(),
                ) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
          />

          <Input
            label="NIK"
            type="number"
            placeholder="1234567890123456"
            className="w-full"
            name="id_card_number"
          />

          <Input
            label="Foto KTP"
            type="file"
            placeholder="Pilih KTP"
            className="w-full"
            name="id_card_photo"
          />

          <Input
            label="Nomor Kartu Keluarga"
            type="number"
            placeholder="1234567890123456"
            className="w-full"
            name="family_card_number"
          />

          <Input
            label="Foto Kartu Keluarga"
            type="file"
            placeholder="Pilih KTP"
            className="w-full"
            name="family_card_photo"
            accept="image/*,application/pdf"
            validationRules={{
              format: (val: any) =>
                ["jpg", "jpeg", "png", "pdf"].indexOf(
                  val.split(".").at(-1).toLowerCase(),
                ) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
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
            onInput={handleRegionChange}
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
            onInput={handleRegionChange}
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
            onInput={handleRegionChange}
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
            onInput={handleRegionChange}
          />

          <Input
            label="Kode pos"
            type="text"
            placeholder="12345"
            maxLength={6}
            className="w-full max-w-[150px]"
            name="id_card_postal_code"
          />
        </div>

        <Textarea
          className="mt-4"
          name="id_card_address"
          label="Alamat KTP"
          placeholder="Jl. ABC No.14 Rt.007/Rw.01"
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
            disabled={!isDomicileFillable}
            onInput={handleRegionChange}
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
            onInput={handleRegionChange}
            disabled={!isDomicileFillable}
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
            onInput={handleRegionChange}
            disabled={!isDomicileFillable}
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
            onInput={handleRegionChange}
            disabled={!isDomicileFillable}
          />

          <Input
            label="Kode pos domisili"
            type="text"
            placeholder="12345"
            className="w-full max-w-[150px]"
            name="domicile_postal_code"
            disabled={!isDomicileFillable}
          />
        </div>

        <Textarea
          className="mt-4"
          label="Alamat domisili"
          name="domicile_address"
          placeholder="Jl. ABC No.14 Rt.007/Rw.01"
          disabled={!isDomicileFillable}
        />

        <h2 className="mt-5 text-lg font-semibold">Koordinat</h2>

        <div className="mt-4 grid grid-cols-3 items-end gap-3 gap-y-5">
          <Input
            label="Latitude"
            type="text"
            placeholder="123.123-12"
            className="w-full"
            name="coor_lat"
            disabled={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />

          <Input
            label="Longitude"
            type="text"
            placeholder="123.123-12"
            className="w-full"
            name="coor_long"
            disabled={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />

          <ButtonDefault
            label="Cek koordinat"
            className="mb-[1px] h-fit w-fit rounded-md bg-primary px-5 py-3 text-white"
            onClick={(e) => {
              e.preventDefault();
              return null;
            }}
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
          />

          <Input
            label="Nomor rekening"
            type="text"
            placeholder="123456789"
            className="w-full"
            name="bank_number"
            // disabled={true}
            validationRules={{
              required: (val: any) => (!val ? "Wajib diisi" : ""),
            }}
          />

          <Input
            label="Foto buku rekening"
            type="file"
            accept="image/*,application/pdf"
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
          />

          <Input
            label="Foto Kartu Tanda Mahasiswa"
            type="file"
            placeholder="Upload foto KTM"
            accept="image/*,application/pdf"
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
          />

          <div></div>

          <div>
            <RadioButtonGroup
              name="science_type"
              variant={RadioButtonVariant.BASIC}
              options={[
                { label: "Eksak", value: "EXACT" },
                { label: "Non-eksak", value: "NON_EXACT", className: "mt-2" },
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
          />

          <Input
            label="Kartu Rencana Studi"
            type="file"
            accept="application/pdf"
            placeholder="Upload KRS"
            className="w-full"
            name="study_plan_card"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
          />

          <Input
            label="Kartu Hasil Studi"
            type="file"
            accept="application/pdf"
            placeholder="Upload KHS"
            className="w-full"
            name="study_result_card"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
          />
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Berkas</h2>

        <div className="mt-4 grid grid-cols-1 items-end gap-3 gap-y-5 md:grid-cols-2">
          <Input
            label="Foto tempat tinggal"
            type="file"
            accept="image/*,application/pdf"
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
          />

          <Input
            label="Lampiran surat permohonan beasiswa"
            type="file"
            accept="application/pdf"
            placeholder="Upload lampiran surat permohonan beasiswa"
            className="w-full"
            name="scholarship_photo"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
          />

          <Input
            label="Lampiran surat pernyataan aktif kuliah"
            type="file"
            accept="application/pdf"
            placeholder="Upload Lampiran surat pernyataan aktif kuliah"
            className="w-full"
            name="active_college"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
          />

          <Input
            label="Print out PDDikti"
            type="file"
            accept="application/pdf"
            placeholder="Upload print out PDDikti"
            className="w-full"
            name="pddikti"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
            }}
          />

          <Input
            label="Surat pernyataan bukan PNS"
            type="file"
            accept="application/pdf"
            placeholder="Upload surat pernyataan bukan PNS"
            className="w-full"
            name="not_civil_servant"
            validationRules={{
              format: (val: any) =>
                ["pdf"].indexOf(val.split(".").at(-1).toLowerCase()) < 0
                  ? "Format file tidak valid"
                  : "",
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
