import React, { ReactNode } from "react";
import DashboardRoot from "./DashboardRoot";
import sidebarMenu from "@/constants/sidebarMenu";
import { getMyAccount, getMyAccountPrivileges } from "@/server/myAccount";
import axios from "axios";
import axiosConfig from "@/utils/axiosConfig";

interface Props {
  children?: ReactNode;
}

export default async function Dashboard({ children }: Props) {
  const { data: privileges } = await getMyAccountPrivileges();
  const { data: account } = await getMyAccount();

  return (
    <DashboardRoot
      sidebar={{
        menuGroup: sidebarMenu,
        accountPrivileges: privileges,
      }}
      header={{
        account: account,
      }}
    >
      {children}
    </DashboardRoot>
  );
}
