import { Button, Modal } from "flowbite-react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

interface ReimbursementsProps {
    requestedDate: Date;
    amount: number;
    status: string;
    id: number;
    businessName: string;
}

const AdminCuponReimburse: React.FC = () =>{

    const [currentItemId, setCurrentItemId] = useState(0)
    const [acceptPopup, setAcceptPopup] = useState(false)
    const [declinePopup, setDeclinePopup] = useState(false)
    const [reimbursements, setReimbursements] = useState<ReimbursementsProps[]>([])


    // const handleAccept =() => {
    //     alert("accept button was cliked")
    //     setAcceptPopup(false)
    // }

    const handleDecline = () => {
        alert("decline button was clicked")
        setDeclinePopup(false)
    }

    const fetchData = async () => {
        const url = `${BACKEND_URL}/reimbursements`

        try{
            const response = await axios.get(url)
            console.log("Response received:", response.data)

              // Transform the response data to match the ReimbursementsProps interface
            const transformedData: ReimbursementsProps[] = response.data.map((item: any) => ({
                requestedDate: item.dateTime, // Use a default date if dateTime is null
                amount: item.amount,
                status: item.status,
                id: item.id,
                businessName: item.business.name,
            }));

            setReimbursements(transformedData);
            
        
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const payTo = () => () => {
        const url = `${BACKEND_URL}/reimbursements/${currentItemId}/PAYED`

        try{
            const response = axios.patch(url)
            toast.success("Mark as PAID")

        }catch (error) {
            console.error("Error occured", error)
        }
    }

    useEffect(() => {
        document.title = "SpotBiz | Admin | Coupons"

        fetchData()
    }, [])

    return(
        <>
            <Container>
                <Adminnavbar/>
                <Adminsidebar selectedTile="Coupon Reimburse"/>
                <div className="px-12 sm:ml-64 mt-20">
                <div className="w-full mb-10 border-b boder-gray-900">
                    <h1 className="text-subsubheading text-bluedark">Coupon Reimburse</h1>
                </div>

                <div className="relative  overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                            <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                                <div className="flex items-center">Ticket ID</div>
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                                <div className="flex items-center">Business Name</div>
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                                <div className="flex items-center">Requested Date</div>
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                                <div className="flex items-center">Amount</div>
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                                <div className="flex items-center">Status</div>
                            </th>
                            <th scope="col" className="px-6 py-3 " style={{ minWidth: '100px' }}>
                                <div className="flex items-center">Action</div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reimbursements.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                {item.id.toString()}
                                </th>
                                <td className="px-6 py-3">{item.businessName}</td>
                                <td className="px-6 py-3">{item.requestedDate == null ? new Date().toLocaleDateString() : new Date(item.requestedDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{item.amount}</td>
                                <td className="px-6 py-3">{item.status}</td>
                                <td className="px-6 py-3 flex gap-0 justify-start">
                                    <Button 
                                    color="dark" 
                                    size="xs" 
                                    onClick={() => {
                                        setCurrentItemId(item.id);
                                        setAcceptPopup(true);
                                    }}>
                                        Pay
                                    </Button>
                                {/* <IconButton
                                    color="default"
                                    onClick={() => {
                                        setCurrentItemId(item.id);
                                        setAcceptPopup(true);
                                    }}
                                    >
                                    <CheckCircleIcon />
                                    </IconButton>
                                    <IconButton
                                    color="error"
                                    onClick={() => {
                                        setCurrentItemId(item.id);
                                        setDeclinePopup(true);
                                    }}
                                    >
                                    <CancelIcon />
                                    </IconButton> */}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </Container>

            {/* Accept coupon modal */}
            <Modal
                show={acceptPopup}
                onClose={() => setAcceptPopup(false)}
                popup
                className="flex items-center justify-center fixed inset-0 z-50"
                theme={{
                content: {
                    base: "bg-white w-3/4 rounded-lg", 
                    inner: "p-6 rounded-lg shadow-lg",
                },
                }}
            >
                <Modal.Header />
                <Modal.Body className="p-0">
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button className="bg-red-600 hover:bg-red-700" onClick={payTo()}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setAcceptPopup(false)}>
                        No, cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>

            {/* Decline coupon model */}
            <Modal
                show={declinePopup}
                onClose={() => setDeclinePopup(false)}
                popup
                className="flex items-center justify-center fixed inset-0 z-50"
                theme={{
                content: {
                    base: "bg-white w-3/4 rounded-lg", 
                    inner: "p-6 rounded-lg shadow-lg",
                },
                }}
            >
                <Modal.Header />
                <Modal.Body className="p-0">
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to decline this coupon?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleDecline}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setDeclinePopup(false)}>
                        No, cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminCuponReimburse;