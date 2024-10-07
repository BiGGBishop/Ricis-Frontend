import { legislationAndRules } from "./utils/legislationAndRulesData";
import { services } from "./utils/servicesData";
import { information } from "./utils/informationPageData";

export const headerDrop = () => {
  return [
    {
      header: "Home",
      href: "/",
      id: "01",
    },
    {
      header: "Search",
      href: "/search",
      id: "02",
    },
    {
      header: "Application",
      href: "/signin",
      id: "03",
    },
    {
      header: "About Us",
      id: "04",
      href: "/about_us",
      drop: [
        {
          name: "Activities",
          href: "/about_us",
        },
        {
          name: "Administrative Structure",
          href: "/about_us",
        },
        {
          name: "Certificate Issued",
          href: "/about_us",
        },
      ],
    },

    {
      header: "Services",
      id: "05",
      href: "/services",
      drop: services,
    },

    {
      header: "Legislation/Rules",
      id: "06",
      href: "/legislation_rules",
      drop: legislationAndRules,
    },

    {
      header: "Information",
      id: "07",
      href: "/information",
      drop: information,
    },

    {
      header: "Notifications",
      id: "08",
      href: "/notification",
      drop: [
        {
          name: "News",
          href: "/notification?selected=News",
        },
        {
          name: "Notice",
          href: "/notification?selected=Notice",
        },
        {
          name: "Circular",
          href: "/notification?selected=Circular",
        },
        {
          name: "Order",
          href: "/notification?selected=Order",
        },
      ],
    },

    {
      header: "FAQs",
      id: "09",
      href: "/faq",
    },

    {
      header: "Contact Us",
      id: "10",
      href: "/contact",
    },
  ];
};
