import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

interface SubscriptionBillings{
    subscriptionBillingId: string;
    billingDate: string;
    billingStatus: string;
    amount: number;
}


const SubscriptionTransactions = () => {

    const [subscriptionBillings, setSubscriptionBillings] = useState<SubscriptionBillings[]>([]);

    const fetchData = async () => {
        const url = `${BACKEND_URL}/transaction-history/subscription-billing`

        try{
            const response  = await axios.get(url);

            const tranformedData = response.data.map((item: any) => {
                return {
                    subscriptionBillingId: item.subscriptionBillingId,
                    billingDate: new Date(item.billingDate).toLocaleDateString(),
                    billingStatus: item.billingStatus,
                    amount: item.amount
                }
                
            })

            setSubscriptionBillings(tranformedData);
            
        } catch (error){
            console.error(error);
        }
    }

    useEffect(() => {
        document.title = "Admin | Transactions history";

        fetchData();


    }, []);

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                <th
                    scope="col"
                    className="px-4 py-3"
                    style={{ minWidth: "120px" }}
                >
                    Billing ID
                </th>
                <th
                    scope="col"
                    className="px-4 py-3"
                    style={{ minWidth: "150px" }}
                >
                    <div className="flex items-center">Billing Date</div>
                </th>
                <th
                    scope="col"
                    className="px-4 py-3"
                    style={{ minWidth: "150px" }}
                >
                    <div className="flex items-center">Status</div>
                </th>
                <th
                    scope="col"
                    className="px-4 py-3"
                    style={{ minWidth: "120px" }}
                >
                    <div className="flex items-center">Amount</div>
                </th>
                </tr>
            </thead>

            <tbody>
                {subscriptionBillings.map((billing) => (
                <tr 
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={billing.subscriptionBillingId}>
                    <td className="px-4 py-3">{billing.subscriptionBillingId}</td>
                    <td className="px-4 py-3">{billing.billingDate}</td>
                    <td className="px-4 py-3">{billing.billingStatus}</td>
                    <td className="px-4 py-3">{billing.amount}</td>
                </tr>
                ))}
            </tbody>
            </table>


    );
}

export default SubscriptionTransactions;