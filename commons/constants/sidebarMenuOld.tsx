import {
  CheckBadgeIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  UserIcon,
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
        label: "Data komplain",
        route: "/complain",
        icon: <CircleStackIcon style={{ height: "20px" }} />,
        privileges: ["COMPLAIN_MANAGE_VIEW"],
      },
      {
        label: "Master Data",
        route: "/master-data",
        icon: <CircleStackIcon style={{ height: "20px" }} />,
        privileges: [
          "BUDGET_MANAGE_VIEW",
          "BUDGET_MANAGE_INSERT",
          "BUDGET_MANAGE_MODIFY",
        ],
      },
      {
        label: "Permohonan",
        // route: "#",
        icon: <DocumentIcon style={{ height: "20px" }} />,
        privileges: [
          "SCHOLARSHIP_GENERAL_VIEW",
          "SCHOLARSHIP_MEDICAL_VIEW",
          "SCHOLARSHIP_COLLAB_VIEW",
        ],
        children: [
          {
            label: "Umum",
            route: "/application/general",
            privileges: [
              "SCHOLARSHIP_GENERAL_VIEW",
              "SCHOLARSHIP_GENERAL_PROPOSE",
              "SCHOLARSHIP_GENERAL_DRAFT",
            ],
          },
          {
            label: "Kedokteran",
            route: "/application/medical",
            privileges: [
              "SCHOLARSHIP_MEDICAL_VIEW",
              "SCHOLARSHIP_MEDICAL_PROPOSE",
              "SCHOLARSHIP_MEDICAL_DRAFT",
            ],
          },
          {
            label: "Kerja sama",
            route: "/application/collab",
            privileges: [
              "SCHOLARSHIP_COLLAB_VIEW",
              "SCHOLARSHIP_COLLAB_PROPOSE",
              "SCHOLARSHIP_COLLAB_DRAFT",
            ],
          },
        ],
      },
      {
        // Self application
        label: "Permohonan saya",
        route: "/my-application",
        icon: <DocumentIcon style={{ height: "20px" }} />,
        privileges: [
          "APPLICANT_SCHOLARSHIP_VIEW",
          "APPLICANT_SCHOLARSHIP_DRAFT",
          "APPLICANT_SCHOLARSHIP_PROPOSE",
        ],
      },
      {
        label: "Verifikasi",
        route: "/verification",
        icon: <DocumentMagnifyingGlassIcon style={{ height: "20px" }} />,
        privileges: ["SCHOLARSHIP_MANAGE_VERIFY"],
      },
      {
        label: "Penetapan",
        route: "/finalize",
        icon: <CheckBadgeIcon style={{ height: "20px" }} />,
        privileges: ["SCHOLARSHIP_MANAGE_FINALIZE"],
      },
      {
        label: "Akun Admin",
        route: "/admin",
        icon: <UserIcon style={{ height: "20px" }} />,
        privileges: [
          "ADMIN_MANAGE_VIEW",
          "ADMIN_MANAGE_SUSPEND",
          "ADMIN_MANAGE_PRIVILEGE",
          "ADMIN_MANAGE_ADD",
        ],
      },
      {
        label: "Sistem",
        // route: "/system-setting",
        icon: <Cog6ToothIcon style={{ height: "20px" }} />,
        privileges: ["VALID_REGION_MANAGE_VIEW", "BANK_MANAGE_VIEW"],
        children: [
          {
            label: "Wilayah Valid",
            route: "/system-setting/valid-region",
            icon: "",
            privileges: ["VALID_REGION_MANAGE_VIEW", "VALID_REGION_MANAGE_ADD"],
          },
          {
            label: "Wilayah",
            route: "/system-setting/region",
            icon: "",
            privileges: [],
          },
          {
            label: "Tingkat pendidikan",
            route: "/system-setting/major-level",
            icon: "",
            privileges: [],
          },
          {
            label: "Bank",
            route: "/system-setting/bank",
            icon: "",
            privileges: [
              "BANK_MANAGE_VIEW",
              "BANK_MANAGE_ADD",
              "BANK_MANAGE_MODIFY",
            ],
          },
        ],
      },
    ],
  },
  // {
  //   name: "UI Components",
  //   menuItems: [
  //     {
  //       label: "Dashboard",
  //       route: "#",
  //       children: [{ label: "eCommerce", route: "/ui-components/" }],
  //     },
  //     {
  //       label: "Calendar",
  //       route: "/ui-components/calendar",
  //     },
  //     {
  //       label: "Profile",
  //       route: "/ui-components/profile",
  //     },
  //     {
  //       label: "Forms",
  //       route: "#",
  //       children: [
  //         {
  //           label: "Form Elements",
  //           route: "/ui-components/forms/form-elements",
  //         },
  //         { label: "Form Layout", route: "/ui-components/forms/form-layout" },
  //       ],
  //     },
  //     {
  //       label: "Tables",
  //       route: "#",
  //       children: [{ label: "Tables", route: "/ui-components/tables" }],
  //     },
  //     {
  //       label: "Pages",
  //       route: "#",
  //       children: [
  //         { label: "Settings", route: "/ui-components/pages/settings" },
  //       ],
  //     },
  //     {
  //       label: "Charts",
  //       route: "#",
  //       children: [
  //         { label: "Basic Chart", route: "/ui-components/charts/basic-chart" },
  //       ],
  //     },
  //     {
  //       label: "UI Elements",
  //       route: "#",
  //       children: [
  //         { label: "Alerts", route: "/ui-components/ui-elements/alerts" },
  //         { label: "Buttons", route: "/ui-components/ui-elements/buttons" },
  //       ],
  //     },
  //     {
  //       label: "Authentication",
  //       route: "#",
  //       children: [{ label: "Sign In", route: "/ui-components/auth/signin" }],
  //     },
  //   ],
  // },
];

export default sidebarMenu;
