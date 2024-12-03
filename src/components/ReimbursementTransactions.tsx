import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

interface ReimbursementTransactions{
    reimbursementId: number;
    businessName: string;
    // businessEmail: string;
    date: string;
    amount: number;
}


const ReimbursementTransactions = () => {

    const [reimbursements, setReimbursements] = useState<ReimbursementTransactions[]>([]);

    const fetchData = async () => {
        const url = `${BACKEND_URL}/transaction-history/reimbursements`

        try{
            const response  = await axios.get(url);

            const tranformedData = response.data.map((item: any) => {
                return {
                    reimbursementId: item.id,
                    businessName: item.businessName,
                    // businessEmail: item.business.user.email,
                    date: new Date(item.dateTime).toLocaleDateString(),
                    amount: item.amount
                }
                
            })

            setReimbursements(tranformedData);
            
        } catch (error){
            console.error(error);
        }
    }


    useEffect(() => {
        
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
                    Reimbursement ID
                    </th>
                    <th
                    scope="col"
                    className="px-4 py-3"
                    style={{ minWidth: "180px" }}
                    >
                    <div className="flex items-center">Business Name</div>
                    </th>
                    {/* <th
                    scope="col"
                    className="px-4 py-3"
                    style={{ minWidth: "200px" }}
                    >
                    <div className="flex items-center">Business Email</div>
                    </th> */}
                    <th
                    scope="col"
                    className="px-4 py-3"
                    style={{ minWidth: "150px" }}
                    >
                    <div className="flex items-center">Date</div>
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
                {reimbursements.map((item) => (
                    <tr key={item.reimbursementId}>
                        <td className="px-4 py-4">{item.reimbursementId}</td>
                        <td className="px-4 py-4">{item.businessName}</td>
                        {/* <td className="px-4 py-4">{item.businessEmail}</td> */}
                        <td className="px-4 py-4">{item.date}</td>
                        <td className="px-4 py-4">{item.amount}</td>
                    </tr>
                ))}
            </tbody>

        </table>

    );
}

export default ReimbursementTransactions;