import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  createMonthBasedOnDate,
  months,
} from "../../functions/filterShipmentsByPeriod";
import { groupBy } from "lodash";
import { sumShipmentsCodByStatus } from "../../functions/sumShipmentsCodByStatus";

// Registering necessary components for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const LineChart = ({ rowData }) => {
  const groupShipmentsByMonth = useMemo(() => {
    return groupBy(rowData, (row) => createMonthBasedOnDate(row));
  }, [rowData]);

  const dataOfChart = useMemo(() => {
    return months.map((month) => {
      const countCod = groupShipmentsByMonth[month]
        ? sumShipmentsCodByStatus(groupShipmentsByMonth[month], "cod")
        : 0;
      const countOtherStatus = groupShipmentsByMonth[month]
        ? sumShipmentsCodByStatus(groupShipmentsByMonth[month], "cop")
        : 0; // Change "otherStatus" to whatever you need
      return { month, countCod, countOtherStatus };
    });
  }, [groupShipmentsByMonth]);

  const data = {
    labels: dataOfChart.map(({ month }) => month),
    datasets: [
      {
        label: "Delivered Sales (COD)",
        data: dataOfChart.map(({ countCod }) => countCod),
        fill: false,
        borderColor: "lightgreen",
        tension: 0.1,
        pointRadius: 5,
      },
      {
        label: "Delivered Sales (COP)", // New line for the second dataset
        data: dataOfChart.map(({ countOtherStatus }) => countOtherStatus),
        fill: false,
        borderColor: "lightblue", // Different color for the second line
        tension: 0.1,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true, // Chart.js built-in responsiveness
    maintainAspectRatio: false, // Disable maintaining aspect ratio to allow full responsiveness
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          // Customize tooltip to display the dollar sign
          label: (context) => {
            const value = context.raw;
            return `$${value.toLocaleString()}`; // Format with dollar sign
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        type: "category", // Specify scale type for the x-axis
      },
      y: {
        beginAtZero: true,
        type: "linear", // Ensure the y-axis uses the linear scale
        ticks: {
          // Customize y-axis ticks to display the dollar sign
          callback: (value) => `$${value.toLocaleString()}`, // Format with dollar sign
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      {" "}
      {/* Set a specific height to control the aspect ratio */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
