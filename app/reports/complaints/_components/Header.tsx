"use client";
import React, { useEffect, useState } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

    const final = `${window.location.origin}${window.location.pathname}?keyword=${json.keyword}&product_status=${json.product_status}&complain_date=${json.complain_date}`;
    window.location.href = final;
  };

  const productStatusOption: any = Object.keys(complainProductStatus).map(
    (item: any, key: number) => (
      <Checkbox
        key={key}
        label={complainProductStatus[item]}
        name="product_status"
        value={item}
        onChange={(e) => {
          if (e.target.checked) {
            let status = productStatus;
            status.push(item);
            setProductStatus(status);
          } else {
            let status = productStatus;
            status.splice(status.indexOf(item), 1);
            setProductStatus(status);
          }
        }}
        checked={productStatus.indexOf(item) >= 0}
      />
    ),
  );

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

        <HeaderDropdown
          label={`(${productStatus.length}) Status produk`}
          className="w-fit"
          options={productStatusOption}
        />
      </div>
      <ButtonDefault
        label="Cari"
        className="rounded-[5px] bg-primary px-4 py-[7px] text-white"
      >
        <MagnifyingGlassIcon
          className="font-semibold"
          style={{ height: "25px" }}
        />
      </ButtonDefault>
      {/* <ExportReportButton reportData={reportData} searchParams={searchParams} /> */}
    </form>
  );
};

export default Header;
