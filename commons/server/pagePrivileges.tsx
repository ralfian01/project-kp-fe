import { arrayHas } from "@/helpers/array";
import { getMyAccountPrivileges } from "./myAccount";

const pagePrivileges = async (rules: any) => {
  const { data: privileges = [] } = await getMyAccountPrivileges();
  let status = false;

  if (arrayHas(privileges, rules) < rules.length) {
    status = false;
  } else {
    status = true;
  }

  return { status };
};

export default pagePrivileges;
