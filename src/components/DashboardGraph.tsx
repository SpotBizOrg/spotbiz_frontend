// // src/components/DashboardGraph.tsx
// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//   datasets: [
//     {
//       label: 'Views',
//       data: [30000, 35000, 32000, 37000, 39000, 40000, 42000],
//       borderColor: 'rgba(54, 162, 235, 1)',
//       backgroundColor: 'rgba(54, 162, 235, 0.2)',
//       fill: true,
//       tension: 0.4,
//       pointHoverRadius: 6,
//       pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
//     },
//     {
//       label: 'Subscribers',
//       data: [500, 700, 800, 1200, 1500, 1700, 2000],
//       borderColor: 'rgba(75, 192, 192, 1)',
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       fill: true,
//       tension: 0.4,
//       pointHoverRadius: 6,
//       pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//     },
//   ],
// };

// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     tooltip: {
//       enabled: true,
//       mode: 'index' as const,
//       intersect: false,
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//     },
//   },
// };

// const PerformanceChart: React.FC = () => {
//   const [timeframe, setTimeframe] = useState('monthly');

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setTimeframe(event.target.value);
//     // Handle data fetching or processing based on selected timeframe here
//   };

//   return (
//     <div className="bg-white pt-3 pb-2 rounded-lg shadow-lg h-90 ml-7 pl-8 pr-8 mt-8"> {/* Increased height to h-96 */}
//       <h2 className="text-lg font-semibold mt-1 mb-3 pl-3">Performance</h2>
//       <div className="flex justify-end mb-4">
//         <select
//           className="border rounded p-2"
//           value={timeframe}
//           onChange={handleChange}
//         >
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//           <option value="yearly">Yearly</option>
//         </select>
//       </div>
//       <div className="mt-4 mb-3 pb-3">
//       <Line data={data} options={chartOptions} />
//       </div>
//       </div>
//   );
// };

// export default PerformanceChart;


import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Subscribe {
  subscribeId: number;
  dateTime: string; // ISO date
  businessId: number;
  userId: number;
}

interface SubscriptionChartProps {
  data: Subscribe[] | null;
  analytics:boolean;
}

const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ data, analytics }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white w-full pt-3 pb-2 rounded-lg shadow-lg pl-8 pr-8 mt-8"> {/* Increased height to h-96 */}
      <h3 className="mt-2 text-xl font-bold text-gray-900 text-center">Business Subscribers</h3>
      <div className='flex flex-col text-center justify-center h-auto'>
      <p className='flex mt-8 justify-center mx-auto'>No subscribers so far</p>

      </div>
    </div>
    );
  }

  // Group subscriptions by date
  const groupedData = data.reduce((acc: { [key: string]: number }, subscription) => {
    const date = subscription.dateTime.split('T')[0]; // Extract date (YYYY-MM-DD)
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart labels and values
  const labels = Object.keys(groupedData); // Dates
  const values = Object.values(groupedData); // Subscription counts

  // Chart.js configuration
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Subscribers',
        data: values,
        backgroundColor: '#bfdbfe',
        borderColor: '#0D3B66',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates', // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Subscribers', // Y-axis label
        },
        beginAtZero: true, // Ensure Y-axis starts at 0
      },
    },
  };

  return (
    <div className="bg-white w-full pt-3 pb-2 rounded-lg shadow-lg pl-8 pr-8 mt-8"> {/* Increased height to h-96 */}
    <h3 className="mt-2 text-xl font-bold text-gray-900 text-center">Business Subscribers</h3>

    { analytics == true ?
      (<Bar data={chartData} options={options} />):(
        <>
        <Bar data={chartData} options={options} className='blur-sm' />
        <p className='text-sm text-gray-500 text-center'>Upgrade the package to see the analytics</p>
        </>
        
        
      )}
    </div>
  
  );
};

export default SubscriptionChart;


