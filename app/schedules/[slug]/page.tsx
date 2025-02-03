import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import { Table, TableRow, TableCell, TableHead } from "@/components/Table";
import { getManageScheduleById } from "@/server/schedule";
import Container from "@/components/Container/Container";
import ContainerTitle from "@/components/Container/ContainerTitle";
import { urlAsset } from "@/helpers/url";

const privilegesRules: Array<string> = ["SCHEDULE_MANAGE_VIEW"];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { slug: scheduleId } = params;
  const { data: scheduleData } = await getManageScheduleById(scheduleId);

  return (
    <Dashboard>
      {hasPrivileges ? (
        scheduleData ? (
          <>
            <Breadcrumb goBack={true} pageName="Jadwal - Detail" />

            <Container
              className="max-w-[500px]"
              header={<ContainerTitle>Rincian jadwal</ContainerTitle>}
            >
              <Table
                body={
                  <>
                    <TableRow>
                      <TableCell className="w-[150px] align-top">
                        Tanggal produksi
                      </TableCell>
                      <TableCell className="w-[5px] text-center align-top">
                        :
                      </TableCell>
                      <TableCell>
                        {scheduleData?.production_date ?? ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[150px] align-top">
                        Tanggal expired
                      </TableCell>
                      <TableCell className="w-[5px] text-center align-top">
                        :
                      </TableCell>
                      <TableCell>{scheduleData?.expired_date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[150px] align-top">
                        Shift
                      </TableCell>
                      <TableCell className="w-[5px] text-center align-top">
                        :
                      </TableCell>
                      <TableCell>{scheduleData?.shift_code}</TableCell>
                    </TableRow>
                  </>
                }
              />
            </Container>

            <div className="item-start mt-7 flex gap-7">
              <Container
                className="h-fit w-full"
                header={<ContainerTitle>Mesin</ContainerTitle>}
              >
                <Table
                  body={
                    <>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Nama mesin
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          {scheduleData?.machine?.name ?? ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Kode mesin
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>{scheduleData?.machine?.code}</TableCell>
                      </TableRow>
                    </>
                  }
                />
              </Container>

              <Container
                className="w-full"
                header={<ContainerTitle>Produk</ContainerTitle>}
              >
                <img
                  src={urlAsset(scheduleData?.product?.image ?? "")}
                  className="h-[100px] w-[100px] rounded-md border border-gray-400 bg-gray-100 object-cover object-center"
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
                        <TableCell>
                          {scheduleData?.product?.name ?? ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Berat
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>{scheduleData?.product?.weight}gr</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[150px] align-top">
                          Durasi expired
                        </TableCell>
                        <TableCell className="w-[5px] text-center align-top">
                          :
                        </TableCell>
                        <TableCell>
                          {scheduleData?.product?.expired} hari
                        </TableCell>
                      </TableRow>
                    </>
                  }
                />
              </Container>
            </div>

            <Container
              className="mt-7"
              header={<ContainerTitle>Staff</ContainerTitle>}
            >
              <Table
                className="relative w-full"
                head={
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead className="">Nama staff</TableHead>
                    <TableHead className="">ID Karyawan</TableHead>
                  </TableRow>
                }
                body={
                  scheduleData?.schedule_employee.length >= 1 ? (
                    scheduleData?.schedule_employee.map(
                      (item: any, key: number) => (
                        <TableRow
                          key={key}
                          className={`${key % 2 == 0 ? "bg-white" : "bg-blue-100"}`}
                        >
                          <TableCell className="text-center">
                            {key + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {item?.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {item?.te_id}
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  ) : (
                    <TableRow>
                      <TableCell className="text-lg font-semibold" colSpan={4}>
                        Tidak ditemukan data staff dari jadwal kerja
                      </TableCell>
                    </TableRow>
                  )
                }
              />
            </Container>
          </>
        ) : (
          "404 Data tidak tersedia"
        )
      ) : (
        "403"
      )}
    </Dashboard>
  );
}
