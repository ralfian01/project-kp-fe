import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Table, TableCell, TableHead, TableRow } from "@/components/Table";
import pagePrivileges from "@/server/pagePrivileges";
import { getManageEmployee } from "@/server/employee";

const privilegesRules: Array<string> = ["EMPLOYEE_MANAGE_VIEW"];

export default async function Page() {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { data: employeeData } = await getManageEmployee();

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb pageName="Karyawan" />

          <Container
            header={
              <div className="flex w-full justify-end">
                <ButtonDefault
                  label="Tambah"
                  link="/employees/new"
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
              {employeeData ? (
                <Table
                  className="relative w-full"
                  head={
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead>
                      <TableHead>Nama Karyawan</TableHead>
                      <TableHead className="w-[150px]">ID Karyawan</TableHead>
                      <TableHead>Status</TableHead>
                      {employeeData && employeeData.length >= 1 ? (
                        <TableHead className="sticky right-0 z-10 w-[100px] bg-gray-300 text-black shadow-xl">
                          Aksi
                        </TableHead>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  }
                  body={
                    employeeData && employeeData.length >= 1 ? (
                      employeeData.map((item: any, key: number) => (
                        <TableRow
                          key={key}
                          className={`${key % 2 == 0 ? "bg-white" : "bg-blue-100"}`}
                        >
                          <TableCell className="text-center">
                            {key + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.name ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.id ?? ""}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.status_active ? (
                              <div className="mx-auto w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-400">
                                Aktif
                              </div>
                            ) : (
                              <div className="mx-auto w-fit rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-400">
                                non-aktif
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="sticky right-0 z-10 bg-gray-200">
                            <div className="flex">
                              <ButtonDefault
                                label=""
                                link={`/employees/${item.id}`}
                                className="mx-1 w-full rounded-md bg-primary px-3 py-1 text-sm text-white"
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
