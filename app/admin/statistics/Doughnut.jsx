import { ApexCharts } from "@/utils/chartHelpers";

const Doughnut = ({ color, label, width, percentage }) => {
  const series = [percentage];

  const options = {
    chart: {
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
        color: "#cbd5e1",
        // fontSize: "20px"
      },
    },
    labels: ["Income"],
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontWeight: "700",
            fontSize: "15px",
          },
        },
      },
    },
    colors: ["#4A3AFF"],
  };

  return (
    <ApexCharts
      series={series}
      options={options}
      type="radialBar"
      height={320}
      width={250}
    />
  );
};

export default Doughnut;
