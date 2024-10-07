import { TrendArrow } from "@/svgs";
import StatChart from "@/Chart";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { ApexCharts } from "@/utils/chartHelpers";
import Image from "next/image";

const StatsCard = ({
  title,
  amount,
  percentage,
  dailyStat,
  increase,
  colorCode,
  colorClass,
}) => {
  const series = [{ name: "dd", data: dailyStat }];
  const options = {
    chart: {
      group: "sparklines",
      type: "area",
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
        color: "transparent",
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      min: 0,
      show: false,
    },
    xaxis: {
      //   type: 'datetime',
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    colors: [`#${colorCode[0]}`],
  };
  return (
    <div className="whitespace-nowra border-2 border-gray-200 rounded-md bg-white flex-grow basis-1/4">
      <p className="p-4 text-lg font-semibold text-gray-700">
        {capitalizeFirstLetter(title)}
      </p>
      <div className="flex items-end justify-between">
        <div className="px-4 py-2 space-y-2">
          <div className="flex">
            <span className="text-4xl">{amount}</span>
            <span className="text-s text-gray-500 self-end">{`+${increase} today`}</span>
          </div>
          <div className="flex items-end gap-1">
            <span
              className={colorClass}
              style={{
                color: `#${colorCode[0]}`,
              }}
            >
              +{percentage}%
            </span>
            <span className="">{TrendArrow(`#${colorCode[0]}`)}</span>
          </div>
        </div>
        {/* <Image src="/images/graph.png" width={200} height={100} /> */}
        <ApexCharts
          type="area"
          series={series}
          options={options}
          width={180}
          height={80}
        />
      </div>
    </div>
  );
};

export default StatsCard;
