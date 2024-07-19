import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const pageViewsData = {
  labels: ['10:20', '14:20', '18:20', '22:20', '02:20', '06:20', '10:20'],
  datasets: [
    {
      label: 'Page Views',
      data: [5000, 4000, 4500, 3000, 4783, 4000, 6000],
      borderColor: 'rgba(13, 59, 102, 1)',
      backgroundColor: 'rgba(13, 59, 102, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: 'rgba(13, 59, 102, 1)',
    },
  ],
};

const userRegistrationsData = {
  labels: ['01', '02', '03', '04', '05', '06', '07'],
  datasets: [
    {
      label: 'This month',
      data: [3, 4, 5, 2, 3, 4, 5],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
    },
    {
      label: 'Last month',
      data: [2, 3, 4, 1, 2, 3, 4],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
    },
  ],
};

const monthlyIncomeData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Premium',
      data: [5000, 6000, 7000, 8000, 9000, 10000, 11000],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Standard',
      data: [3000, 4000, 5000, 6000, 7000, 8000, 9000],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
    },
  ],
};

const yearlyIncomeData = {
  labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Premium',
      data: [60000, 70000, 80000, 90000, 100000, 110000],
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
    },
    {
      label: 'Standard',
      data: [40000, 50000, 60000, 70000, 80000, 90000],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      enabled: true,
      mode: 'index' as const,
      intersect: false,
      callbacks: {
        label: function (context: any) {
          return `${context.raw.toLocaleString()} hours`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value: number | string) {
          return typeof value === 'number' ? `${value}h` : value;
        },
      },
    },
  },
};

const PerformanceChart: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState('pageViews');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChart(event.target.value);
  };

  const getData = () => {
    switch (selectedChart) {
      case 'pageViews':
        return pageViewsData;
      case 'userRegistrations':
        return userRegistrationsData;
      case 'monthlyIncome':
        return monthlyIncomeData;
      case 'yearlyIncome':
        return yearlyIncomeData;
      default:
        return pageViewsData;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg text-primary font-semibold mb-4">Performance</h2>
      <div className="flex justify-end mb-4">
        <select
          className="border rounded p-2"
          value={selectedChart}
          onChange={handleChange}
        >
          <option value="pageViews">Page Views</option>
          <option value="userRegistrations">User Registrations</option>
          <option value="monthlyIncome">Monthly Income</option>
          <option value="yearlyIncome">Yearly Income</option>
        </select>
      </div>
      <Line
        data={getData()}
        options={chartOptions}
      />
    </div>
  );
};

export default PerformanceChart;
