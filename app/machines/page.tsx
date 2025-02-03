import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Table, TableCell, TableHead, TableRow } from "@/components/Table";
import pagePrivileges from "@/server/pagePrivileges";
import { getManageMachine } from "@/server/machine";
import DeleteButton from "./_components/DeleteButton";

const privilegesRules: Array<string> = ["MACHINE_MANAGE_VIEW"];

export default async function Page() {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { data: machineData } = await getManageMachine();

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb pageName="Mesin" />

          <Container
            header={
              <div className="flex w-full justify-end">
                <ButtonDefault
                  label="Tambah"
                  link="/machines/new"
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
              {machineData ? (
                <Table
                  className="relative w-full"
                  head={
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead>
                      <TableHead>Nama mesin</TableHead>
                      <TableHead>Kode mesin</TableHead>
                      {machineData && machineData.length >= 1 ? (
                        <TableHead className="sticky right-0 z-10 w-[100px] bg-gray-300 text-black shadow-xl">
                          Aksi
                        </TableHead>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  }
                  body={
                    machineData && machineData.length >= 1 ? (
                      machineData.map((item: any, key: number) => (
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
                            {item.code ?? ""}
                          </TableCell>
                          <TableCell className="sticky right-0 z-10 bg-gray-200">
                            <div className="flex gap-1">
                              <DeleteButton machineData={item} />

                              <ButtonDefault
                                label=""
                                link={`/machines/${item.id}`}
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
