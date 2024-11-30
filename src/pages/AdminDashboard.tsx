import React, { useEffect, useRef, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import PerformanceChart from "../components/PerformanceChart";
import LatestBusiness from "../components/LatetBusiness"; // Assuming there's a typo in the import name
import Container from "../components/Container";
import { useAuth } from "../utils/AuthProvider";
import AdminDashboardStats from "../components/AdminDashboardStats";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { HashLoader } from "react-spinners";
import SubscriptionChart from "../components/DashboardGraph";
import BillingChart from "../components/BillingDetailsChart";
import PieChart from "../components/BusinessCategoryChart";
import { Button } from "flowbite-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface SubscriptionBilling {
  subscriptionBillingId: number;
  subscriptionId: number;
  businessId: number;
  billingDate: string; // ISO date string, e.g., "2024-11-15T15:45:45.016"
  billingStatus: "PAID" | "DELETED"; // Enum-like for known statuses
  amount: number;
  active: boolean;
}


interface DashboardProps{
  customerCount: number;
  businessCount: number;
  totalRevenue: number;
  billingList: SubscriptionBilling[];
  businessCategoryCount: Record<string, number>;

}

const AdminDashboard: React.FC = () => {

  const { user, checkAuthenticated, login } = useAuth();
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardProps | null>(null)
  const pageRef = useRef<HTMLDivElement>(null);

  const fetchData = async() =>{
    const url = `${BACKEND_URL}/admin-dashboard`

    try{
      setLoading(true)
      const response = await axios.get(url);
      console.log(response.data);
      setDashboardData(response.data)

      
    }catch (e: any) {
      console.error("Error fetching dashboard data:", e.message || e);
    } finally{
      setLoading(false)
    }
  }


  useEffect(() => {
    document.title = "SpotBiz | Dashboard | Admin";

    fetchData()

    if (!checkAuthenticated() || user?.role != "ADMIN") {
      login();
    }
  }, []);

// Function to generate PDF
const generatePDF = () => {
  const input = pageRef.current;
  if (input) {
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const doc = new jsPDF("landscape", "mm", "a4");  // "landscape" orientation, A4 size
      const currentDate = new Date().toLocaleDateString();

      // Adding the header and date
      doc.setFontSize(18);
      doc.text("Admin Dashboard Report", 14, 20);
      doc.setFontSize(12);
      doc.text(`Generated on: ${currentDate}`, 14, 30);

      // Adding the captured content of the page with smaller image size
      const imageWidth = 300; // Smaller width for the image (in mm)
      const imageHeight = (canvas.height * imageWidth) / canvas.width; // Scale the height proportionally
      doc.addImage(imgData, "PNG", 10, 40, imageWidth, imageHeight);  // Adjusted to fit landscape and smaller size


      // Save the PDF
      doc.save("admin_dashboard_report.pdf");
    });
  }
};

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Dashboard" />
      <div className="px-12 sm:ml-64 mt-20" ref={pageRef}>
        <AdminDashboardStats customerCount={dashboardData?.customerCount || 45} businessCount={dashboardData?.businessCount || 102} totalRevenue={dashboardData?.totalRevenue || 14500} />
        <div className="flex flex-row gap-4 w-full">
          <BillingChart billingList={dashboardData?.billingList || null}/>
          {dashboardData?.businessCategoryCount &&
            <PieChart businessCategoryCount={dashboardData?.businessCategoryCount}/>}
        </div>
        

        {/* <div className="flex-grow  mt-10">
          <h1 className="text-subsubheading text-bluedark mb-10">
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <PerformanceChart />
            </div>
            <div className="flex-1">
              <LatestBusiness />
            </div>
          </div>
        </div> */}
      </div>
      <div className="fixed bottom-6 right-2">
            <Button color="dark" size="sm" onClick={generatePDF}>Generate Report</Button>

        </div>
      <div className="px-12 sm:ml-64 mt-20">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminDashboard;


