import {
  CheckBadgeIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  UserIcon,
  ReceiptRefundIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  CalendarDateRangeIcon,
  ArchiveBoxIcon,
  FlagIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

const sidebarMenu: any = [
  {
    name: "",
    menuItems: [
      {
        label: "Beranda",
        route: "/",
        icon: <HomeIcon style={{ height: "20px" }} />,
        privileges: [],
      },
      {
        label: "Komplain",
        route: "/complaints",
        icon: <ExclamationTriangleIcon style={{ height: "20px" }} />,
        privileges: ["COMPLAIN_MANAGE_VIEW"],
      },
    ],
  },
  {
    name: "Laporan",
    menuItems: [
      {
        label: "Laporan Komplain",
        route: "/reports/complaints",
        icon: <FlagIcon style={{ height: "20px" }} />,
        privileges: ["COMPLAIN_REPORT_VIEW"],
      },
    ],
  },
  {
    name: "Operation",
    menuItems: [
      {
        label: "Karyawan",
        route: "/employees",
        icon: <UserGroupIcon style={{ height: "20px" }} />,
        privileges: [],
      },
      {
        label: "Produk",
        route: "/products",
        icon: <ArchiveBoxIcon style={{ height: "20px" }} />,
        privileges: [],
      },
      {
        label: "Mesin",
        route: "/machines",
        icon: <CubeTransparentIcon style={{ height: "20px" }} />,
        privileges: [],
      },
      {
        label: "Jadwal",
        route: "/schedules",
        icon: <CalendarDateRangeIcon style={{ height: "20px" }} />,
        privileges: [],
      },
    ],
  },
];

export default sidebarMenu;
