import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Table, TableCell, TableHead, TableRow } from "@/components/Table";
import pagePrivileges from "@/server/pagePrivileges";
import DeleteButton from "./_components/DeleteButton";
import { getManageSchedule } from "@/server/schedule";

const privilegesRules: Array<string> = ["SCHEDULE_MANAGE_VIEW"];

export default async function Page() {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { data: scheduleData } = await getManageSchedule();

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb pageName="Jadwal" />

          <Container
            header={
              <div className="flex w-full justify-end">
                <ButtonDefault
                  label="Tambah"
                  link="/schedules/new"
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
              {scheduleData ? (
                <Table
                  className="relative w-full"
                  head={
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead>
                      <TableHead>Tanggal produksi</TableHead>
                      <TableHead className="w-[50px]">Shift</TableHead>
                      <TableHead>Kode mesin</TableHead>
                      <TableHead>Produk</TableHead>
                      <TableHead className="w-[150px]">Jumlah staff</TableHead>
                      {scheduleData && scheduleData.length >= 1 ? (
                        <TableHead className="sticky right-0 z-10 w-[100px] bg-gray-300 text-black shadow-xl">
                          Aksi
                        </TableHead>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  }
                  body={
                    scheduleData && scheduleData.length >= 1 ? (
                      scheduleData.map((item: any, key: number) => (
                        <TableRow
                          key={key}
                          className={`${key % 2 == 0 ? "bg-white" : "bg-blue-100"}`}
                        >
                          <TableCell className="text-center">
                            {key + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.production_date ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.shift_code ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.machine.code ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.product.name ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.schedule_employee.length ?? ""}
                          </TableCell>
                          <TableCell className="sticky right-0 z-10 bg-gray-200">
                            <div className="flex gap-1">
                              <DeleteButton scheduleData={item} />

                              <ButtonDefault
                                label="Detail"
                                link={`/schedules/${item.id}`}
                                className="mx-1 w-full rounded-md bg-primary px-3 py-1 text-sm text-white"
                              >
                                <EyeIcon style={{ height: "15px" }} />
                              </ButtonDefault>
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
