import React, { useEffect, useState } from "react"
import Container from "../components/Container"
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

interface ScannedCouponProps{
    scannedCouponId: number,
    couponId: number,
    dateTime: Date,
    discount: number,
    status: "PENDING" | "ISSUED" | "USED" | "DELETED"
}




const BusinessCupon: React.FC = () => {
    // const [businessId, setBusinessId] = useState<number>(0);
    const [coupons, setCoupons] = useState<ScannedCouponProps[]>([]);
    const storedEmail = localStorage.getItem("email");
    const businessId = 4;
    const [openScanCode, setOpenScanCode] = useState(false);
    const [scanCode, setScanCode] = useState<string>("");

    const fetchData = async () => {
        const url = `${BACKEND_URL}/scanned_coupon/business/${businessId}`;

        try{
            const response = await axios.get(url);
            console.log("Fetched scanned:", response.data);
            
            setCoupons(response.data);
        }catch (error){
            console.error("Error fetching business ID:", error);
        }
        
    }

    const handleVerifyCoupon = async () => {

        console.log("Scanned code:", scanCode);
        

    }

    // const fetchBusinessId = async () => {
    //     const url = `${BACKEND_URL}/business_owner/business/${storedEmail}`;

    //     try{
    //         const response = await axios.get(url);            
    //         setBusinessId(response.data.businessId);
    //     }catch (error){
    //         console.error("Error fetching business ID:", error);
    //     }
    // }

    useEffect(() => {
        document.title = "Business | Manage Coupons";

        // fetchBusinessId();
        
    }, []);

    useEffect(() => {
        // if (businessId !== 0) {
        //     fetchData();
        // }

        fetchData();

    }, [businessId]);


    return (
        <Container>
        <Businessnavbar />
        <Businesssidebar selectedTile="Manage Coupons" />
        <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-10">
          <h1 className="text-subsubheading mb-10 text-bluedark">Coupon Reimburse</h1>
          <div className="flex gap-4">
            <div className="flex space-x-4 z-40">
                <Button color="dark" onClick={() => setOpenScanCode(true)}>Scan Code</Button>
            </div>

            </div>
          </div>

          <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  Scanned Coupon ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Coupon ID</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Date</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Discounted Amount</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Status</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 "
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>

            <tbody>
                {
                    coupons.map((coupon, index) => (
                        <tr key={index} className="border-b border-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>{coupon.scannedCouponId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">{coupon.couponId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">{coupon.dateTime == null ? new Date().toLocaleString() : coupon.dateTime.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">{coupon.discount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">{coupon.status}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Button size="xs" color="dark">Reimburse</Button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
            </tbody>
            </table>
            </div>
          </div>


          <Modal
        show={openScanCode}
        onClose={() => setOpenScanCode(false)}
        size="lg"
        className="flex items-center justify-center min-h-screen  z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="text-center">Verify the scan code</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="purpose">Enter the scan code</Label>
              <TextInput
                id="purpose"
                type="text"
                value={scanCode}
                onChange={(e) =>
                  setScanCode(e.target.value)
                }
                className="w-full"
              />
            </div>
         
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleVerifyCoupon}
          >
            Verify Coupon
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setOpenScanCode(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
        </Container>
    )
}

export default BusinessCupon;