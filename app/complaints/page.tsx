import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { Table, TableCell, TableHead, TableRow } from "@/components/Table";
import { formatToRupiah } from "@/helpers/number";
import pagePrivileges from "@/server/pagePrivileges";
import { TrashIcon } from "@heroicons/react/16/solid";
import Header from "./_components/Header";
import { redirect } from "next/navigation";
import { getComplainReport } from "@/server/complain";
import {
  complainProductStatus,
  complainReceiveMedia,
} from "@/constants/complaints";
import DeleteButton from "./_components/DeleteButton";

const privilegesRules: Array<string> = ["COMPLAIN_MANAGE_VIEW"];

export default async function Page({ searchParams }: { searchParams: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { data: complaintData } = await getComplainReport(searchParams);

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb pageName="Komplain" />

          <Container
            header={<Header reportData={[]} searchParams={searchParams} />}
          >
            <div className="overflow-auto">
              {complaintData ? (
                <Table
                  className="relative w-full min-w-[1200px]"
                  head={
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead>
                      <TableHead className="w-[150px]">Nama produk</TableHead>
                      <TableHead className="w-[50px]">No. Keluhan</TableHead>
                      <TableHead className="2-[100px]">Kode expired</TableHead>
                      <TableHead className="w-[130px]">
                        Tanggal komplain
                      </TableHead>
                      <TableHead className="w-[130px]">Kategori</TableHead>
                      <TableHead className="w-[50px]">
                        Media penerimaan
                      </TableHead>
                      <TableHead className="w-[130px]">Status produk</TableHead>
                      <TableHead className="w-[150px]">File bukti</TableHead>
                      {complaintData && complaintData.length >= 1 ? (
                        <TableHead className="sticky right-0 z-10 w-[100px] bg-gray-300 text-black shadow-xl">
                          Aksi
                        </TableHead>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  }
                  body={
                    complaintData && complaintData.length >= 1 ? (
                      complaintData.map((item: any, key: number) => (
                        <TableRow
                          key={key}
                          className={`${key % 2 == 0 ? "bg-white" : "bg-blue-100"}`}
                        >
                          <TableCell className="text-center">
                            {key + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.product.name ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.complain_number}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.expired_code}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.complain_date}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.complain_category}
                          </TableCell>
                          <TableCell className="text-center">
                            {complainReceiveMedia[item.receive_media]}
                          </TableCell>
                          <TableCell className="text-center">
                            {complainProductStatus[item.product_status]}
                          </TableCell>
                          <TableCell className="text-center">
                            <ButtonDefault
                              label="Lihat bukti"
                              link={`${item.evidence_file}`}
                              className="w-full rounded-md px-3 py-1 text-sm text-primary"
                            >
                              <EyeIcon style={{ height: "15px" }} />
                            </ButtonDefault>
                          </TableCell>
                          <TableCell className="sticky right-0 z-10  bg-gray-200">
                            <div className="flex gap-1">
                              <DeleteButton complainData={item} />

                              <ButtonDefault
                                label=""
                                link={`/complaints/${item.id}`}
                                className="w-full rounded-md bg-primary px-3 py-1 text-sm text-white"
                              >
                                <PencilSquareIcon style={{ height: "15px" }} />
                              </ButtonDefault>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          className="text-lg font-semibold"
                          colSpan={4}
                        >
                          Tidak ada data
                        </TableCell>
                      </TableRow>
                    )
                  }
                />
              ) : (
                ""
              )}
            </div>
          </Container>
        </>
      ) : (
        "403"
      )}
    </Dashboard>
  );
}

{
  /* <TableHead className="bg-gray-100">
  <TableCell className="w-[50px]">No.</TableCell>
  <TableCell className="w-[50px]">Tahun</TableCell>
  <TableCell className="w-[50px]">Periode</TableCell>
  <TableCell className="w-[150px]">Tanggal mulai</TableCell>
  <TableCell className="w-[150px]">Tanggal selesai</TableCell>
  <TableCell>Pagu</TableCell>
  <TableCell>Sisa anggaran</TableCell>
  <TableCell>Status</TableCell>
  <TableCell className="sticky right-0 z-10 bg-gray-300 text-black shadow-xl">
    Aksi
  </TableCell>
</TableHead>;
{
  complaintData &&
    complaintData.map((item: any, key: number) => (
      <TableBody key={key} className="bg-white">
        <TableCell className="text-center">{key + 1}</TableCell>
        <TableCell className="text-center">{item.year}</TableCell>
        <TableCell className="text-center">
          {item.budget_category.name}
        </TableCell>
        <TableCell className="text-center">{item.period_start}</TableCell>
        <TableCell className="text-center">{item.period_end}</TableCell>
        <TableCell className="text-center">
          Rp.{formatToRupiah(item.amount)}
        </TableCell>
        <TableCell className="text-center">
          Rp.{formatToRupiah(item.amount)}
        </TableCell>
        <TableCell className="flex justify-center">
          <div
            className={`w-full whitespace-nowrap rounded-full ${item.status == "ACTIVE" ? "bg-primary" : "bg-red"} px-3 py-1 text-center text-sm text-white`}
          >
            {item.status == "ACTIVE" ? "Aktif" : "Non-aktif"}
          </div>
        </TableCell>
        <TableCell className="sticky right-0 z-10  bg-gray-200">
          <ButtonDefault
            label="Edit"
            link={`/complaints/${item.id}`}
            className="mx-auto w-full rounded-md bg-primary px-3 py-1 text-sm text-white"
          >
            <PencilSquareIcon style={{ height: "15px" }} />
          </ButtonDefault>

          <ButtonDefault
            label="Kuota"
            link={`/complaints/${item.id}/allocation`}
            className="mx-auto mt-1 w-full rounded-md bg-green px-3 py-1 text-sm text-white"
          >
            <RectangleStackIcon style={{ height: "15px" }} />
          </ButtonDefault>
        </TableCell>
      </TableBody>
    ));
} */
}
