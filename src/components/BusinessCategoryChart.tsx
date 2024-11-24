import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  businessCategoryCount: Record<string, number>;
}

const PieChart: React.FC<PieChartProps> = ({ businessCategoryCount }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[], // Categories
    datasets: [
      {
        label: "Business Categories",
        data: [] as number[], // Counts
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Extract labels and values from the businessCategoryCount
    const labels = Object.keys(businessCategoryCount);
    const data = Object.values(businessCategoryCount);

    setChartData({
      labels,
      datasets: [
        {
          label: "Business Categories",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [businessCategoryCount]);

  return (
    <div className="bg-white w-2/5 pt-3 pb-2 rounded-lg shadow-lg pl-8 pr-8 mt-8"> {/* Increased height to h-96 */}
        <h3 className="mt-2 text-xl font-bold text-gray-900 text-center">Business Categories</h3>
        <div className="p-4">
        <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            // title: {
            //   display: true,
            // //   text: "Business Categories Pie Chart",
            // },
          },
        }}
      />
        </div>
      
    </div>
  );
};

export default PieChart;
