import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  Layout: {
    autoPadding: true,
  },

  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2.1,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export function BarChart({ barPriceData }) {
  return (
    <Bar style={{ marginLeft: "50px" }} options={options} data={barPriceData} />
  );
}
