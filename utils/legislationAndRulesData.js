export const legislationAndRules = [
  {
    name: "Factories Act 2004",
    hasDrop: false,
    id: 1,
  },
  {
    name: "Boiler and Pressure Vessel Regulation 2019",
    hasDrop: false,
    id: 2,
  },
  {
    name: "Lifting and Allied Works Equipment (Safety) Regulation",
    hasDrop: false,
    id: 3,
  },
  {
    name: "Approved Code of Practice",
    hasDrop: true,
    id: 45,
    subRule: [
      {
        name: "Boiler and Pressure Vessels Code of Practice",
        id: 4,
      },
      {
        name: "Lifting and Allied Works Code of Practice",
        id: 5,
      },
    ],
  },
  {
    name: "Guidelines",
    hasDrop: true,
    id: 23,
    subRule: [
      {
        name: "Boiler and Pressure Vessels",
        id: 6,
      },
      {
        name: "Lifting and Allied Works",
        id: 7,
      },
    ],
  },
];

export const subLegislationAndRules = [
  {
    id: 1,
    name: "Factories Act 2004",
    details: {
      pdfs: [
        {
          icon: "/images/pdfIcon.svg",
          des: "Factories Act 2004",
  link: "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Factories%20Act%20CAP%20126%20LFN.pdf?alt=media&token=91a735c9-f1d5-43c7-9f46-b10ee4032d26"
        },
      ],
    },
  },
  {
    id: 2,
    name: "Boiler and Pressure Vessel Regulation 2019",
    details: {
      pdfs: [
        {
          icon: "/images/pdfIcon.svg",
          des: "Boiler and Pressure Vessel Regulation 2019",
  link: "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Boiler%20and%20Pressure-2024-06-24T13-45-20.019Z.pdf?alt=media",
        },
      ],
    },
  },
  {
    id: 3,
    name: "Lifting and Allied Works Equipment (Safety) Regulation",
    details: {
      pdfs: [
        {
          icon: "/images/pdfIcon.svg",
          des: "Lifting and Allied Works Equipment (Safety) Regulation",
  link: "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Lifting%20%26%20Allied%20Work%20Equipmenyt%20Regulation%202018-1.pdf?alt=media&token=58649310-b379-4405-8588-106db7dd6e2c",
        },
      ],
    },
  },
  {
    id: 4,
    name: "Approved Code of Practice",
    details: {
      pdfs: [
        {
          icon: "/images/pdfIcon.svg",
          des: "Boiler and Pressure Vessels Code of Practice",
        },
      ],
    },
  },
  {
    id: 5,
    name: "Approved Code of Practice",
    details: {
      pdfs: [
        {
          icon: "/images/pdfIcon.svg",
          des: "Lifting and Allied Works Code of Practice",
        },
      ],
    },
  },
  {
    id: 6,
    name: "Guidelines",
    details: {
      pdfs: [
        {
          icon: "/images/pdfIcon.svg",
          des: "Boiler and Pressure Vessels",
        },
      ],
    },
  },
  {
    id: 7,
    name: "Guidelines",
    details: {
      pdfs: [
        {
          icon: "/images/pdfIcon.svg",
          des: "Lifting and Allied Works",
        },
      ],
    },
  },
];