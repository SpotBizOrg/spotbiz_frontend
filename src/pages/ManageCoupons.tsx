import { useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Coupon {
  couponId: number;
  createdDate: string;
  purpose: string;
  discountRate: string;
  validity: string;
}

const dummyCoupons: Coupon[] = [
  {
    couponId: 1,
    createdDate: "2023-07-01",
    purpose: "Summer Sale",
    discountRate: "20%",
    validity: "2023-08-01",
  },
  {
    couponId: 2,
    createdDate: "2023-07-05",
    purpose: "New User",
    discountRate: "10%",
    validity: "2023-12-31",
  },
  {
    couponId: 3,
    createdDate: "2023-07-10",
    purpose: "Black Friday",
    discountRate: "50%",
    validity: "2023-11-25",
  },
];

function ManageCoupons() {
  const [items, setItems] = useState<Coupon[]>(dummyCoupons);
  const [showPopup, setShowPopup] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState<number | null>(null);

  const handleVerify = () => {
    console.log(`Coupon with ID ${currentCouponId} has been verified.`);
    setShowPopup(false); // Close the modal after verification
  };

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Business Registration" />

      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between w-full mb-10 border-b-gray-900">
          <h1 className="text-subsubheading text-bluedark">Discount Coupons</h1>

        </div>

        <div className="relative overflow-x-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Coupon ID
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Created Date</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Purpose</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Discount Rate</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Validity</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.couponId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.couponId.toString()}
                  </th>
                  <td className="px-6 py-4">{item.createdDate}</td>
                  <td className="px-6 py-4">{item.purpose}</td>
                  <td className="px-6 py-4">{item.discountRate}</td>
                  <td className="px-6 py-4">{item.validity}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      color="dark"
                      size="xs"
                      onClick={() => {
                        setCurrentCouponId(item.couponId);
                        setShowPopup(true);
                      }}
                    >
                      Verify
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showPopup} onClose={() => setShowPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to mark verify this coupon?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleVerify}>
                {"Yes, I'm sure"}
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ManageCoupons;
