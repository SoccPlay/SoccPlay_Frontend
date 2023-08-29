import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ pitchNumber }) {
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };
  return <Pie data={pitchNumber} options={options} />;
}
