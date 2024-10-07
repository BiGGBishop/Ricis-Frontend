import React from "react";

const Order = () => {
  const data = [
    `Keeping up with your competitor’s latest product announcements in
			real-time is close to impossible. We’ve added Product Launches to the
			list of strategic moves AI Engine... For questions like these, Sienna
			and her team seek information to compile resource lists or reports.`,
    "Research critical vulnerabilities with the new CVE Intelligence Card",
    "Research critical vulnerabilities with the new CVE Intelligence Card",
    `Keeping up with your competitor’s latest product announcements in
			real-time is close to impossible. We’ve added Product Launches to the
			list of strategic moves AI Engine... For questions like these, Sienna
			and her team seek information to compile resource lists or reports.`,
    "How a top 10 pharma company tracks drug innovations and more with us",
    "Don’t miss out on your competitors and partners’ product launches For questions like these, Sienna and her team seek information to compile resource lists or reports.",
    `Keeping up with your competitor’s latest product announcements in
			real-time is close to impossible. We’ve added Product Launches to the
			list of strategic moves AI Engine... For questions like these, Sienna
			and her team seek information to compile resource lists or reports.`,
    "Research critical vulnerabilities with the new CVE Intelligence Card",
    "Research critical vulnerabilities with the new CVE Intelligence Card",
    `Keeping up with your competitor’s latest product announcements in
			real-time is close to impossible. We’ve added Product Launches to the
			list of strategic moves AI Engine... For questions like these, Sienna
			and her team seek information to compile resource lists or reports.`,
    "How a top 10 pharma company tracks drug innovations and more with us",
    "Don’t miss out on your competitors and partners’ product launches For questions like these, Sienna and her team seek information to compile resource lists or reports.",
  ];

  const notice_data = [
    {
      id: "n1",
      text: "Boiler Requirements according to the Federal Ministry Of Labour and Employment changes NIG - 1-2-3",
    },
    {
      id: "n2",
      text: "Boiler Requirements according to the Federal Ministry Of Labour and Employment changes NIG - 1-2-3",
    },
    {
      id: "n3",
      text: "Boiler Requirements according to the Federal Ministry Of Labour and Employment changes NIG - 1-2-3",
    },
    {
      id: "n4",
      text: "Boiler Requirements according to the Federal Ministry Of Labour and Employment changes NIG - 1-2-3",
    },
    {
      id: "n5",
      text: "Boiler Requirements according to the Federal Ministry Of Labour and Employment changes NIG - 1-2-3",
    },
    {
      id: "n6",
      text: "Boiler Requirements according to the Federal Ministry Of Labour and Employment changes NIG - 1-2-3",
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-white w-full p-4 space-y-16">
        {notice_data.map((item) => (
          <h2 key={item.id} className="border-b text-lg font-semibold pb-3">
            {item.text}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Order;
