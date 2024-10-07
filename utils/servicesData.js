export const services = [
  {
    name: "Registration",
    firtServiceId: 1,
    Image:
      "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Picture%206.png?alt=media&token=4960de57-5b25-49e3-9821-2888bcc42255",
    subServices: [
      {
        name: "Boiler and Pressure Vessel",
        id: 1,
      },
      {
        name: "Lifting and Allied Works",
        id: 2,
      },
    ],
  },
  {
    name: "Authorisation",
    firtServiceId: 3,
    Image:
      "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Picture%205.png?alt=media&token=327b04ec-8523-4100-af55-fda77edd172b",
    subServices: [
      {
        name: "Boiler and Pressure Vessel",
        id: 3,
      },
      {
        name: "Lifting and Allied Works",
        id: 4,
      },
    ],
  },
  {
    name: "Certification",
    firtServiceId: 5,
    Image:
      "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Picture%204.png?alt=media&token=cd24022f-f3c0-4438-961a-122e5fbacaeb",
    subServices: [
      {
        name: "Boiler and Pressure Vessel",
        id: 5,
      },
      {
        name: "Lifting and Allied Works",
        id: 6,
      },
    ],
  },
  {
    name: "Document Review",
    firtServiceId: 7,
    Image:
      "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Picture%203.png?alt=media&token=92153527-a9e9-401d-9c0d-f8eab21c5771",
    subServices: [
      {
        name: "Design Review",
        id: 7,
      },
      {
        name: "Quality Program Review",
        id: 8,
      },
      {
        name: "Investigation Report Review",
        id: 9,
      },
    ],
  },
  {
    name: "Accident Investigation",
    firtServiceId: 10,
    Image:
      "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Picture%201.png?alt=media&token=9c2f2ed2-0474-4cf9-a5b9-684e1a949164",
    subServices: [
      {
        name: "",
        id: 10,
      },
    ],
  },
  {
    name: "Technical Training",
    firtServiceId: 11,
    Image:
      "https://firebasestorage.googleapis.com/v0/b/biz-hub101.appspot.com/o/Picture%202.png?alt=media&token=eebf0316-d845-4024-975f-a18dcb616e4d",
    subServices: [
      {
        name: "",
        id: 11,
      },
    ],
  },
];

export const subServices = [
  {
    id: 1,
    name: "Registration",
    details: {
      header: "Boiler and Pressure Vessel Equipment Registration",
      title:
        "The Director of Factories shall register a boiler or pressure vessel manufactured, installed, operated, or used in Nigeria and assign a registration number to it accordingly:",
      lists: [
        {
          des: " Provided the Authorised Inspector is satisfied that the review of the design, quality control program, and manufacturing process is in compliance with the requirements of these Regulations.",
        },
        {
          des: "An application for the registration of a boiler or pressure vessel shall be submitted to the Director of Factories in the prescribed form, together with the prescribed fees, either after its manufacture or before installation.",
        },
        {
          des: "Drawings, calculations, specifications, and other information required for the purposes of an application for registration must be submitted in duplicate.",
        },
        {
          des: "With respect to an application for the registration of a boiler or pressure vessel, or its alteration or repair, other information referred to in sub-regulation (3) of this regulation includes:",
          subLists: [
            "The design pressure and temperature",
            "Details of the arrangement and dimensions of all component parts",
            "The material details and specifications as required by the adopted code or standard ;",
            "Details of the proposed manufacture, welded joint configuration, and quality control plan",
            "The section and paragraph number of the adopted code and standards under which it is being constructed",
            "A report of physical tests conducted for the purpose of establishing the maximum allowable working pressure.",
          ],
        },
      ],
    },
  },

  {
    id: 2,
    name: "Registration",
    details: {
      header: "Lifting and Allied Works Equipment Registration",
      lists: [
        {
          des: "The designated classes of Elevating Vehicles include:",
          mainSubLists: [
            {
              name: "Elevator Comprising:",
              subLists: [
                "Passenger Elevators",
                "Freight Elevators",
                "Material Lifts",
              ],
            },
            {
              name: "Escalators:",
            },
            {
              name: "Manlifts",
            },
            {
              name: "Construction and Material Hoists",
            },
            {
              name: "Special Elevating Devices",
            },
          ],
        },
        {
          des: "A Certificate of Competency for an Approved Person shall be by endorsement in the following categories:",
          mainSubLists: [
            {
              name: "Category A",
              subLists: [
                "Overhead Travelling Cranes",
                "Goliath and Semi-Goliath Cranes",
                "Monorail Cranes",
              ],
            },
            {
              name: "Category B",
              subLists: ["Tower Cranes", "Self Erecting Tower Cranes"],
            },
            {
              name: "Category C",
              subLists: [
                "Mobile Cranes",
                "Truck-Mounted Cranes",
                "Vehicle-Mounted Truck Loader Cranes",
                "Forklifts",
              ],
            },
            {
              name: "Category D",
              subLists: [
                "Offshore Cranes",
                "Guy Derrick Cranes",
                "Container Cranes",
              ],
            },
            {
              name: "Category E",
              subLists: ["Escalators", "Lifts"],
            },
          ],
        },
      ],
    },
  },

  {
    id: 3,
    name: "Authorization",
    details: {
      header: "Boiler and Pressure Vessel Authorization",
      lists: [
        {
          des: "A person or organisation involved in the business of manufacturing, installing, altering, or repairing boilers, pressure vessels, fittings, or piping systems shall be registered as an Approved Contractor, by the Director of Factories.",
        },
        {
          des: "An organisation involved in the business of inspection and certification of boilers, pressure vessels, fittings, or piping systems shall be registered as an Approved Inspection Agency, by the Director of Factories.",
        },
        {
          des: "A person or organisation, involved in the training of engineers, Authorized Inspectors, boiler operators, and technicians shall be registered as a Training Contractor, by the Director of Factories.",
        },
      ],
    },
  },

  {
    id: 4,
    name: "Authorization",
    details: {
      header: "Lifting and Allied Works Equipment Authorization",
      title: "The Director of Factories shall register-",
      lists: [
        {
          des: "As a Lift Contractor, a person or organization involved in the construction, installation, alteration, repair, maintenance, servicing, or testing of an elevating device",
        },
        {
          des: "As an Inspection Agency, an organization involved in inspection, thorough examination, and testing of lifting equipment, lifting accessory, other allied work equipment for lifting application, and elevating device",
        },
        {
          des: "As a Training Contractor, a person or organization involved in the raining of lifting equipment operators and Approved Inspectors.",
        },
      ],
    },
  },

  {
    id: 5,
    name: "Certification",
    details: {
      header: "Boiler and Pressure Vessel Certification",
      lists: [
        {
          des: "Certificates of competency, which may be issued by the Director of Factories under these Regulations include:",
          subLists: [
            "Authorized Inspector",
            "Certified Power Engineer",
            "Certified Refrigeration Engineer",
            "Certified Power Technician",
            "Certified Refrigeration Plant Technician",
          ],
          subDetails: {
            subHeader: "Pressure Welder",
            subTitle:
              "No person is permitted to weld on a boiler, pressure vessel, piping, fitting, or refrigeration plant without a valid licence from the Director of Factories, The classes of pressure welder licences include:",
            subLists: [
              "Class MW - Manual Welding",
              "Class SW - Semi-Automatic or Machine Welding.",
            ],
          },
        },
        {
          des: "A person or organisation involved in the business of manufacturing, inspection and certification, installing, altering, or repairing boilers, pressure vessels, fittings, or piping systems and training of engineers, Authorized Inspectors, boiler operators, and technicians include:",
          subLists: [
            "Approved Contractor",
            "Approved Inspection Agency",
            "Training Contractor",
          ],
        },
      ],
    },
  },

  {
    id: 6,
    name: "Certification",
    details: {
      header: "Lifting and Allied Work Certification",
      lists: [
        {
          des: "Certificates of competency, which may be issued by the Director of Factories under these Regulations include:",
          subLists: [
            "Technical Authority (Lifting Equipment)",
            "Appointed Person (Lifting Operations)",
            "Approved Person (Thorough Examination)",
            "Approved Lift Installer",
            "Lifting Equipment Operator",
            "Work Equipment Operator",
            "Rigger",
            "Lifting Equipment Operation Assistant",
            "Scaffolding Technician",
            "Abseiling Technician",
          ],
        },
        {
          des: "A person or organisation involved in the business of manufacturing, inspection and certification, installing, altering, or repairing boilers, pressure vessels, fittings, or piping systems and training of engineers, Authorized Inspectors, boiler operators, and technicians include:",
          subLists: [
            "Mobile Crane and Tower Crane",
            "Travelling Cranes",
            "Overhead Travelling Cranes",
          ],
        },
      ],
    },
  },

  
];
