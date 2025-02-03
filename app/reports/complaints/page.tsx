import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Table, TableCell, TableHead, TableRow } from "@/components/Table";
import pagePrivileges from "@/server/pagePrivileges";
import Header from "./_components/Header";
import { getComplainReport } from "@/server/complain";
import {
  complainProductStatus,
  complainReceiveMedia,
} from "@/constants/complaints";
import { redirect } from "next/navigation";

const privilegesRules: Array<string> = ["COMPLAIN_REPORT_VIEW"];

export default async function Page({ searchParams }: { searchParams: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { product_status } = searchParams;
  const { data: complaintData } = await getComplainReport(searchParams);

  // If parameter empty
  if (!product_status) {
    redirect(
      `/reports/complaints?product_status=${Object.keys(complainProductStatus).join(",")}`,
    );
  }

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb pageName="Laporan Komplain" />

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
                            <ButtonDefault
                              label="Detail"
                              link={`/reports/complaints/${item.id}`}
                              className="mx-1 w-full rounded-md bg-primary px-3 py-1 text-sm text-white"
                            >
                              <EyeIcon style={{ height: "15px" }} />
                            </ButtonDefault>
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
