import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SubscriptionBilling {
    subscriptionBillingId: number;
    subscriptionId: number;
    businessId: number;
    billingDate: string; // ISO date string, e.g., "2024-11-15T15:45:45.016"
    billingStatus: "PAID" | "DELETED";
    amount: number;
    active: boolean;
  }
  
interface BillingChartProps {
  billingList: SubscriptionBilling[] | null;
}

const BillingChart: React.FC<BillingChartProps> = ({ billingList }) => {
    const [chartData, setChartData] = useState({
      labels: [] as string[], // Dates
      datasets: [
        {
          label: "Daily Revenue",
          data: [] as number[], // Revenue for each date
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  
    useEffect(() => {
      if (!billingList || billingList.length === 0) {
        setChartData({
          labels: [],
          datasets: [
            {
              label: "Daily Revenue",
              data: [],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
        return;
      }
  
      // Group billings by date
      const revenueByDate: Record<string, number> = {};
      billingList.forEach((billing) => {
        if (
          billing &&
          billing.billingStatus === "PAID" &&
          typeof billing.amount === "number" &&
          billing.billingDate
        ) {
          const date = new Date(billing.billingDate).toISOString().split("T")[0]; // Extract only the date part
          revenueByDate[date] = (revenueByDate[date] || 0) + billing.amount;
        }
      });
  
      // Prepare data for the chart
      const labels = Object.keys(revenueByDate).sort(); // Sort dates chronologically
      const data = labels.map((date) => revenueByDate[date]);
  
      setChartData({
        labels,
        datasets: [
          {
            label: "Daily Revenue",
            data,
            backgroundColor: "#bfdbfe",
            borderColor: "#0D3B66",
            borderWidth: 1,
          },
        ],
      });
    }, [billingList]);
  
    return (
        <div className="bg-white w-3/5 pt-3 pb-2 rounded-lg shadow-lg pl-8 pr-8 mt-8"> {/* Increased height to h-96 */}
        <h3 className="mt-2 text-xl font-bold text-gray-900 text-center">Past 30 days billings</h3>
        {chartData.labels.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: "Daily Revenue from Subscriptions",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date', // X-axis label
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Amount', // Y-axis label
                  },
                  beginAtZero: true, // Ensure Y-axis starts at 0
                },
              },
            }}
          />
        ) : (
          <p>No data available for the chart.</p>
        )}
      </div>
    );
  };
  

export default BillingChart;
