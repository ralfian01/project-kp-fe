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
import pagePrivileges from "@/server/pagePrivileges";
import { getApplicant } from "@/server/applicant";
import DeleteButton from "./_components/DeleteButton";
import ProposeButton from "./_components/ProposeButton";

const privilegesRules: Array<string> = ["SCHOLARSHIP_MEDICAL_VIEW"];

const statusName = (statusCode: string) => {
  switch (statusCode.toUpperCase()) {
    case "DRAFT":
      return "Draft";

    case "PENDING":
      return "Menunggu Verifikasi";

    case "APPROVED":
      return "Diterima";

    case "REJECT":
      return "Ditolak";

    case "FINALIZED":
      return "Ditetapkan";
  }
};

export default async function Page() {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { data: applicationMedical } = await getApplicant("medical");

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb pageName="Permohonan - Kedokteran" />

          <Container
            header={
              <div className="flex w-full justify-end">
                <ButtonDefault
                  label="Tambah pemohon"
                  link="/application/medical/new"
                  className="rounded-[5px] bg-primary px-4 py-[7px] text-white"
                >
                  <PlusCircleIcon
                    className="font-semibold"
                    style={{ height: "25px" }}
                  />
                </ButtonDefault>
              </div>
            }
          >
            <div className="overflow-auto">
              {applicationMedical ? (
                <Table
                  className="relative w-full min-w-[1100px]"
                  head={
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead className="w-[50px]">Strata</TableHead>
                      <TableHead>Universitas</TableHead>
                      <TableHead>Jurusan</TableHead>
                      <TableHead className="w-[50px]">IPK</TableHead>
                      <TableHead className="w-[150px]">
                        Eksak/Non-eksak
                      </TableHead>
                      <TableHead className="w-[150px]">Status</TableHead>
                      {applicationMedical && applicationMedical.length >= 1 ? (
                        <TableHead className="sticky right-0 z-10 w-[100px] bg-gray-300 text-black shadow-xl">
                          Aksi
                        </TableHead>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  }
                  body={
                    applicationMedical && applicationMedical.length >= 1 ? (
                      applicationMedical.map((item: any, key: number) => (
                        <TableRow
                          key={key}
                          className={`${key % 2 == 0 ? "bg-white" : "bg-blue-100"}`}
                        >
                          <TableCell className="text-center">
                            {key + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.identity?.full_name ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.student?.major_level?.name ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.student?.university ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.student?.major_name ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.student?.gpa ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.student?.science_type ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            <div
                              className={`inline-block w-full whitespace-nowrap rounded-full ${["DRAFT", "PENDING"].indexOf(item.status) >= 0 ? "bg-gray-200 text-gray-700" : ["APPROVED"].indexOf(item.status) >= 0 ? "bg-blue-400" : ["FINALIZED"].indexOf(item.status) >= 0 ? "bg-green-500" : "bg-red"} px-3 py-1 text-center text-sm text-white`}
                            >
                              {statusName(item.status)}
                            </div>
                          </TableCell>

                          <TableCell className="sticky right-0 z-10  bg-gray-200">
                            <div className="flex">
                              {["DRAFT", "REJECT"].indexOf(item.status) >= 0 ? (
                                <>
                                  <ProposeButton applicantData={item} />

                                  <ButtonDefault
                                    label=""
                                    link={`/application/medical/${item.applicant_id}`}
                                    className="mx-1 w-full rounded-md bg-primary px-3 py-1 text-sm text-white"
                                  >
                                    <PencilSquareIcon
                                      style={{ height: "15px" }}
                                    />
                                  </ButtonDefault>

                                  <DeleteButton applicantData={item} />
                                </>
                              ) : (
                                <>
                                  <ButtonDefault
                                    label="Detail"
                                    link={`/application/medical/${item.applicant_id}`}
                                    className="mx-1 w-full rounded-md bg-primary px-3 py-1 text-sm text-white"
                                  >
                                    <EyeIcon style={{ height: "15px" }} />
                                  </ButtonDefault>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          className="text-lg font-semibold"
                          colSpan={6}
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
