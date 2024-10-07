import Link from "next/link";
import React from "react";

const FooterText = ({ header, data }) => {
  return (
    <div>
      <h2 className="inter700 text-[1rem] font-semibold leading-[14px] text-white mb-[1rem]">
        {" "}
        {header}{" "}
      </h2>
      {data?.map((current_data, i) => {
        let firstSubServiceId;
        let firstSubRuleId;
        const containsSub = Object.keys(current_data)?.includes("subServices");
        const containsHasDrop = Object.keys(current_data)?.includes("hasDrop");
        if (containsSub) {
          firstSubServiceId = current_data.subServices[0]?.id;
        }
        if (containsHasDrop) {
          if (current_data.hasDrop) {
            firstSubRuleId = current_data.subRule[0]?.id;
          } else {
            firstSubRuleId = current_data?.id;
          }
        }
        return (
          <Link
            href={
              header === "Services"
                ? `/services?tab=${current_data.name}&subId=${firstSubServiceId}`
                : header === "Legislation/Rules"
                ? `/legislation_rules?tab=${current_data.name}&subId=${firstSubRuleId}`
                : header === "Information"
                ? "/information"
                : current_data.href
            }
            className="sf400 flex text-[#e2e2e2] text-xs lg:text-[0.7rem] leading-[21px] mb-[10px]"
            key={i}
          >
            {current_data.name}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterText;
