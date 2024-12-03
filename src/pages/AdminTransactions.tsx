import { useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import SubscriptionTransactions from "../components/SubscriptionTransactions";
import ReimbursementTransactions from "../components/ReimbursementTransactions";
import { Button } from "flowbite-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { HashLoader } from "react-spinners";

const AdminTransactions = () => {
    const [activeTab, setActiveTab] = useState('subscription');
    const [loading, setLoading] = useState(false);

    const downloadReport = async () => {
        setLoading(true);
        try {
            
            const url = `${BACKEND_URL}/transaction-report`;

            const response = await axios.get(url, {
                responseType: 'blob', // Ensures the response is treated as a binary file
            });
    
            // Create a link to download the PDF file
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'transaction_history_report.pdf'; 
            link.click(); // Simulate a click to trigger the download
        } catch (error) {
            console.error('Error downloading the report:', error);
        } finally{
            setLoading(false);
        }
    };

    
    return (
        <>
            <Container>
                <Adminnavbar/>
                <Adminsidebar selectedTile="Transactions"/>
                <div className="px-12 sm:ml-64 mt-20">
                <div className="w-full mb-5 border-b boder-gray-900">
                    <h1 className="text-subsubheading text-bluedark">Transactions</h1>
                </div>
                
                <div className="relative  overflow-x-auto overflow-y-auto sm:rounded-lg mb-2">
                <div className="flex items-center justify-between w-full">

                    <div className="flex items-center space-x-6"></div>
                              {/* Add the download report button */}
                <Button
                        onClick={downloadReport}
                        size="sm"
                        color="dark"
                        // className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Download Detailed Report
                    </Button>

                    </div>
                </div>

                <div className="relative  overflow-x-auto overflow-y-auto sm:rounded-lg">

                    {/* the tabs */}
                <div className="flex items-center space-x-6 mb-5 border-b border-gray-200">
                    <button
                    className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'subscription' ? 'text-black border-b-4 border-black' : 'bg-transparent text-gray-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('subscription')}
                    >
                    Subscription Billings
                    </button>
                    <button
                    className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'reimburse' ? 'text-black border-b-4 border-black' : 'bg-transparent text-gray-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('reimburse')}
                    >
                    Coupon Reimburse
                    </button>
                   
                </div>
                </div>

          

                {activeTab === 'subscription' &&
                    <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
                    <SubscriptionTransactions/>
                </div>}
                {activeTab === 'reimburse' &&
                    <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
                    <ReimbursementTransactions/>
                </div>}


                </div>
                <div className="px-12 sm:ml-64 mt-20">
                {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <HashLoader color="#36d7b7" size={50} />
                </div>
                )}
            </div>
                </Container>
        </>
    );
}

export default AdminTransactions;