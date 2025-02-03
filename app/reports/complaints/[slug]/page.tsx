import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import ContainerTitle from "@/components/Container/ContainerTitle";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Table, TableRow, TableCell, TableHead } from "@/components/Table";
import { getComplainReportById } from "@/server/complain";
import {
  complainProductStatus,
  complainReceiveMedia,
} from "@/constants/complaints";
import Image from "next/image";
import { urlAsset } from "@/helpers/url";

const privilegesRules: Array<string> = ["COMPLAIN_REPORT_VIEW"];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { slug } = params;
  const { data: complaintData } = await getComplainReportById(slug);

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb goBack={true} pageName="Laporan Komplain - Detail" />

          <>
            <div className="flex items-start gap-6">
              <Container
                className="w-full"
                header={<ContainerTitle>Detail komplain</ContainerTitle>}
              >
                <Table
                  body={
                    <>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          No. Keluhan
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>{complaintData?.complain_number}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Tanggal keluhan
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>{complaintData?.complain_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Kode expired
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>{complaintData?.expired_code}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Kategori keluhan
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          {complaintData?.complain_category}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Media penerimaan
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          {complainReceiveMedia[complaintData?.receive_media]}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Status produk
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          {complainProductStatus[complaintData?.product_status]}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Deskripsi komplain
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>{complaintData?.description}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Foto bukti
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          <ButtonDefault
                            label="Lihat bukti"
                            link={complaintData?.evidence_file}
                            className="w-fit rounded-md object-cover text-sm text-primary"
                          >
                            <EyeIcon style={{ height: "15px" }} />
                          </ButtonDefault>
                        </TableCell>
                      </TableRow>
                    </>
                  }
                />
              </Container>

              <Container
                className="w-full"
                header={<ContainerTitle>Data produk</ContainerTitle>}
              >
                <img
                  src={urlAsset(complaintData?.product?.image ?? "")}
                  alt=""
                  // width={100}
                  // height={100}
                  className="h-[100px] w-[100px] rounded-md border border-gray-100 bg-gray-200"
                  referrerPolicy="no-referrer"
                />

                <Table
                  className="mt-4"
                  body={
                    <>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Nama produk
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>{complaintData?.product?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Berat produk
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          {complaintData?.product?.weight}gr
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Durasi expired
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          {complaintData?.product?.expired} hari
                        </TableCell>
                      </TableRow>
                    </>
                  }
                />
              </Container>
            </div>

            <Container
              header={<ContainerTitle>Staff terkait</ContainerTitle>}
              className="mt-7"
            >
              <div className="w-full overflow-auto">
                <Table
                  className="relative w-full"
                  head={
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead>
                      <TableHead className="">Nama staff</TableHead>
                      <TableHead className="w-[150px]">
                        Tanggal produksi
                      </TableHead>
                      <TableHead className="2-[100px]">
                        Kode line mesin
                      </TableHead>
                      <TableHead className="w-[100px]">Shift</TableHead>
                    </TableRow>
                  }
                  body={
                    complaintData?.related_schedule &&
                    complaintData?.related_schedule.length >= 1 ? (
                      complaintData?.related_schedule.map(
                        (item: any, key: number) =>
                          item.schedule_employee.map(
                            (emp: any, empKey: number) => (
                              <TableRow
                                key={empKey}
                                className={`${empKey % 2 == 0 ? "bg-white" : "bg-blue-100"}`}
                              >
                                <TableCell className="text-center">
                                  {key + 1}
                                </TableCell>
                                <TableCell className="text-center">
                                  {emp.name}
                                </TableCell>
                                <TableCell className="text-center">
                                  {
                                    complaintData?.related_schedule[key]
                                      ?.production_date
                                  }
                                </TableCell>
                                <TableCell className="text-center">
                                  {
                                    complaintData?.related_schedule[key]
                                      ?.machine.code
                                  }
                                </TableCell>
                                <TableCell className="text-center">
                                  {
                                    complaintData?.related_schedule[key]
                                      ?.shift_code
                                  }
                                </TableCell>
                              </TableRow>
                            ),
                          ),
                      )
                    ) : (
                      <TableRow>
                        <TableCell className="text-md" colSpan={4}>
                          Tidak ditemukan data staff dari jadwal kerja
                        </TableCell>
                      </TableRow>
                    )
                  }
                />
              </div>
            </Container>
          </>
        </>
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
