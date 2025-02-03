"use client";
import React, { useEffect, useState } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import HeaderDropdown from "@/components/Container/Header/HeaderDropdown";
import Checkbox from "@/components/Forms/Checkbox";
import HeaderInput from "@/components/Container/Header/HeaderInput";
import { complainProductStatus } from "@/constants/complaints";

type Props = {
  reportData: any;
  searchParams?: any;
};

const Header: React.FC<Props> = ({ reportData, searchParams }) => {
  const { product_status, keyword, complain_date } = searchParams;

  const [productStatus, setProductStatus] = useState<Array<any>>([]);

  useEffect(() => {
    setProductStatus(product_status ? product_status.split(",") : []);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;

    const json: any = {
      product_status: productStatus,
      keyword: form.keyword?.value ?? "",
      complain_date: form.complain_date?.value ?? "",
    };

    const final = `${window.location.origin}${window.location.pathname}?keyword=${json.keyword}&complain_date=${json.complain_date}`;
    window.location.href = final;
  };

  return (
    <form
      className="flex w-full"
      style={{ gap: "10px" }}
      onSubmit={handleSubmit}
    >
      <div
        className="mr-1 flex w-full items-center justify-start"
        style={{ gap: "10px" }}
      >
        <HeaderInput
          type="text"
          label="Nama produk, No. keluhan"
          name="keyword"
          value={keyword ?? ""}
        />

        <HeaderInput
          type="date"
          label="Tanggal komplain"
          name="complain_date"
          value={complain_date ?? ""}
        />
      </div>

      <div className="flex gap-2">
        <ButtonDefault
          label="Cari"
          className="rounded-[5px] bg-primary px-4 py-[7px] text-white"
        >
          <MagnifyingGlassIcon
            className="font-semibold"
            style={{ height: "25px" }}
          />
        </ButtonDefault>

        <ButtonDefault
          label="Tambah"
          link="/complaints/new"
          className="rounded-[5px] bg-primary px-4 py-[7px] text-white"
        >
          <PlusCircleIcon
            className="font-semibold"
            style={{ height: "25px" }}
          />
        </ButtonDefault>
      </div>
    </form>
  );
};

export default Header;
