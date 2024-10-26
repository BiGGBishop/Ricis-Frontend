import {
  dashboardIcon,
  applicationIcon,
  draftsIcon,
  NotificationIcon,
  CiChartIcon,
  tranactionIcon,
  RecordIcon,
  UserIcon,
  feesIcon,
  Analytics,
  cerificateIcon,
  categoryIcon
} from "@/svgs";

export const UserSidebarLinks = [
  {
    id: "s1",
    name: "Dashboard",
    href: "/user",
    icon: dashboardIcon,
  },
  {
    id: "s2",
    name: "Applications",
    href: "/user/applications",
    icon: applicationIcon,
  },
  {
    id: "s3",
    name: "Notifications",
    href: "/user/notifications",
    icon: NotificationIcon,
  },
  {
    id: "s4",
    name: "Drafts",
    href: "/user/drafts",
    icon: draftsIcon,
  },
  {
    id: "s5",
    name: "Payment Record",
    href: "/user/transactions",
    icon: RecordIcon,
  },
  {
    id: "s6",
    name: "Certification",
    href: "/user/certification",
    icon: cerificateIcon,
  },
  // {
  //   id: "s7",
  //   name: "Certification",
  //   href: "/user/certification",
  //   icon: cerificateIcon,
  // },
  {
    id: "s8",
    name: "Fees",
    href: "/user/fees",
    icon: feesIcon,
  },
];

export const AdminSidebarLinks = [
  {
    id: "s1",
    name: "Overview",
    href: "/admin",
    icon: CiChartIcon,
  },
  {
    id: "s2",
    name: "App Management",
    href: "/admin/app-management",
    icon: dashboardIcon,
  },
  {
    id: "s3",
    name: "Staff Management",
    href: "/admin/staff-management",
    icon: applicationIcon,
  },
  {
    id: "s4",
    name: "User Management",
    href: "/admin/user-management",
    icon: NotificationIcon,
  },
  {
    id: "s9",
    name: "Category",
    href: "/admin/category",
    icon: cerificateIcon,
  },
  {
    id: "sss3",
    name: "Sub Category",
    href: "/admin/SubCategory",
    icon: cerificateIcon,
  },
  {
    id: "s7",
    name: "Classification",
    href: "/admin/classification",
    icon: cerificateIcon,
  },
  {
    id: "s5",
    name: "Payment Record",
    href: "/admin/financial-management",
    icon: draftsIcon,
  },
  {
    id: "s6",
    name: "Statistics",
    href: "/admin/statistics",
    icon: Analytics,
  },
];

export const StaffSidebarLinks = [
  {
    id: "sss1",
    name: "Overview",
    href: "/admin",
    icon: CiChartIcon,
  },
  {
    id: "sss2",
    name: "App Management",
    href: "/admin/app-management",
    icon: dashboardIcon,
  },
];
