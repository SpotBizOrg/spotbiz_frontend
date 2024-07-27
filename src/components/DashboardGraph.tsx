// src/components/DashboardGraph.tsx
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

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Views',
      data: [30000, 35000, 32000, 37000, 39000, 40000, 42000],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
      tension: 0.4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
    },
    {
      label: 'Subscribers',
      data: [500, 700, 800, 1200, 1500, 1700, 2000],
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
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const PerformanceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeframe(event.target.value);
    // Handle data fetching or processing based on selected timeframe here
  };

  return (
    <div className="bg-white pt-3 pb-2 rounded-lg shadow-lg h-90 ml-7 pl-8 pr-8 mt-4"> {/* Increased height to h-96 */}
      <h2 className="text-lg font-semibold mt-1 mb-3 pl-3">Performance</h2>
      <div className="flex justify-end mb-3">
        <select
          className="border rounded p-2"
          value={timeframe}
          onChange={handleChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Line data={data} options={chartOptions} />
    </div>
  );
};

export default PerformanceChart;
