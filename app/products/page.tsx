import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Container/Container";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Table, TableCell, TableHead, TableRow } from "@/components/Table";
import pagePrivileges from "@/server/pagePrivileges";
import { getManageProduct } from "@/server/product";
import { urlAsset } from "@/helpers/url";
import DeleteButton from "./_components/DeleteButton";

const privilegesRules: Array<string> = ["PRODUCT_MANAGE_VIEW"];

export default async function Page() {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { data: productData } = await getManageProduct();

  return (
    <Dashboard>
      {hasPrivileges ? (
        <>
          <Breadcrumb pageName="Produk" />

          <Container
            header={
              <div className="flex w-full justify-end">
                <ButtonDefault
                  label="Tambah"
                  link="/products/new"
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
              {productData ? (
                <Table
                  className="relative w-full"
                  head={
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead>
                      <TableHead>Nama Produk</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Durasi expired</TableHead>
                      <TableHead className="w-[150px]">Foto produk</TableHead>
                      {productData && productData.length >= 1 ? (
                        <TableHead className="sticky right-0 z-10 w-[100px] bg-gray-300 text-black shadow-xl">
                          Aksi
                        </TableHead>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  }
                  body={
                    productData && productData.length >= 1 ? (
                      productData.map((item: any, key: number) => (
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
                            {item.weight ?? ""}gr
                          </TableCell>
                          <TableCell className="text-center">
                            {item.expired_duration ?? ""} hari
                          </TableCell>
                          <TableCell className="text-center">
                            <img
                              src={urlAsset(item.image)}
                              className="mx-auto h-[50px] w-[50px] object-cover object-center"
                            />
                          </TableCell>
                          <TableCell className="sticky right-0 z-10 bg-gray-200">
                            <div className="flex gap-1">
                              <DeleteButton productData={item} />
                              <ButtonDefault
                                label=""
                                link={`/products/${item.id}`}
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
