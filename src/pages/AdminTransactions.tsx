import { useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import SubscriptionTransactions from "../components/SubscriptionTransactions";
import ReimbursementTransactions from "../components/ReimbursementTransactions";

const AdminTransactions = () => {
    const [activeTab, setActiveTab] = useState('subscription');

    
    return (
        <>
            <Container>
                <Adminnavbar/>
                <Adminsidebar selectedTile="Transactions"/>
                <div className="px-12 sm:ml-64 mt-20">
                <div className="w-full mb-5 border-b boder-gray-900">
                    <h1 className="text-subsubheading text-bluedark">Transactions</h1>
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
                </Container>
        </>
    );
}

export default AdminTransactions;