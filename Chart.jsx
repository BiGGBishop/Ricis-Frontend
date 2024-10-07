// StatChart.js
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StatChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    function getGradient(ctx, chartArea) {
      let gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0.9, `#${data.chart_color[0]}`);
      gradient.addColorStop(0, `#${data.chart_color[1]}`);
      return gradient;
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Amount", "Amount Today", "D", "D", "s", "w", "1"],
          datasets: [
            {
              data: data.dailyStat,
              backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) {
                  // This case happens on initial chart load
                  return;
                }
                return getGradient(ctx, chartArea);
              },
              borderColor: `#${data.chart_color[0]}`,
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
              borderWidth: 1,
              lineTension: 0.4, // Adjust the curve here
              fill: true, // Fill the area under the line
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false, // Hide x-axis
            },
            y: {
              display: false,
              position: "right", // Position y-axis on the right
              beginAtZero: true,
            },
          },
        plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
          elements: {
            point: {
              display: false, // Hide data points
            },
          },
          layout: {
            padding: {
              left: 0, // Adjust left padding
              right: 0, // Adjust right padding
              top: 0, // Adjust top padding
              bottom: 0, // Adjust bottom padding
            },
          },
          responsive: true,
          maintainAspectRatio: false, // Allow chart to adjust width and height
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default StatChart;
