import Dashboard from "@/components/Layouts/Dashboard";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import pagePrivileges from "@/server/pagePrivileges";
import Form from "./form";
import { getManageEmployeeById } from "@/server/employee";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import AlertError from "@/components/Alerts/AlertError";
import { getManageProductById } from "@/server/product";

const privilegesRules: Array<string> = ["PRODUCT_MANAGE_VIEW"];

export default async function Page({ params }: { params?: any }) {
  const { status: hasPrivileges } = await pagePrivileges(privilegesRules);

  const { slug: productId } = params;
  const { data: productData } = await getManageProductById(productId);

  return (
    <Dashboard>
      {hasPrivileges ? (
        productData ? (
          <>
            <Breadcrumb goBack={true} pageName="Produk - Edit" />

            <Form productId={productId} productData={productData} />
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
