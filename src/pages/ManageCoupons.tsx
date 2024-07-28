import { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { Button, Modal, TextInput, Label } from "flowbite-react";
import { FaPlus } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IconButton } from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  IosShare as IosShareIcon
} from "@mui/icons-material";

const dummyUsers = [
  { name: "John Doe", email: "john@example.com", phone: "123-456-7890", score:90 },
  { name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", score:87 },
  { name: "Alice Johnson", email: "alice@example.com", phone: "555-555-5555", score:86 },
];

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
    createdDate: "2024-07-02",
    purpose: "Game Launch",
    discountRate: "20%",
    validity: "Claimed",
  },
  {
    couponId: 2,
    createdDate: "2024-07-05",
    purpose: "New Player",
    discountRate: "10%",
    validity: "Claimed",
  },
  {
    couponId: 3,
    createdDate: "2024-07-25",
    purpose: "Event Special",
    discountRate: "50%",
    validity: "Issued",
  },
  {
    couponId: 4,
    createdDate: "2024-07-26",
    purpose: "Level Up Bonus",
    discountRate: "15%",
    validity: "Issued",
  },
  {
    couponId: 5,
    createdDate: "2024-07-15",
    purpose: "Weekend Sale",
    discountRate: "25%",
    validity: "Claimed",
  },
  {
    couponId: 6,
    createdDate: "2024-07-27",
    purpose: "Exclusive Offer",
    discountRate: "30%",
    validity: "Issued",
  },
  {
    couponId: 7,
    createdDate: "2024-07-10",
    purpose: "Anniversary Bonus",
    discountRate: "40%",
    validity: "Claimed",
  },
  {
    couponId: 8,
    createdDate: "2024-07-29",
    purpose: "Season Pass",
    discountRate: "35%",
    validity: "Issued",
  },
  {
    couponId: 9,
    createdDate: "2024-07-30",
    purpose: "Special Quest",
    discountRate: "60%",
    validity: "Pending",
  },
  {
    couponId: 10,
    createdDate: "2024-07-28",
    purpose: "Holiday Event",
    discountRate: "20%",
    validity: "Issued",
  },
  {
    couponId: 11,
    createdDate: "2024-07-31",
    purpose: "Daily Reward",
    discountRate: "25%",
    validity: "Issued",
  },
  {
    couponId: 12,
    createdDate: "2024-07-15",
    purpose: "Mega Sale",
    discountRate: "50%",
    validity: "Claimed",
  },
  {
    couponId: 13,
    createdDate: "2024-07-30",
    purpose: "Festive Season",
    discountRate: "30%",
    validity: "Pending",
  },
  {
    couponId: 14,
    createdDate: "2024-07-05",
    purpose: "Special Offer",
    discountRate: "40%",
    validity: "Claimed",
  },
  {
    couponId: 15,
    createdDate: "2024-07-01",
    purpose: "Valentine's Bonus",
    discountRate: "20%",
    validity: "Claimed",
  }
];

function ManageCoupons() {
  useEffect(()=>{
    document.title = "SpotBiz | Coupons | Admin";
  },[]);
  
  const [items, setItems] = useState<Coupon[]>(dummyCoupons);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState<number | null>(null);
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    couponId: items.length + 1,
    createdDate: "",
    purpose: "",
    discountRate: "",
    validity: "Pending",
  });
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);

  const handleAddCoupon = () => {
    setItems([...items, newCoupon]);
    setShowForm(false);
  };

  const handleDeleteCoupon = () => {
    setItems(items.filter((item) => item.couponId !== currentCouponId));
    setShowPopup(false);
    setCurrentCouponId(null);
  };

  const handleEditCoupon = () => {
    setItems(items.map((item) => item.couponId === editCoupon!.couponId ? editCoupon! : item));
    setShowEditForm(false);
    setEditCoupon(null);
  };

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Coupons" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-10">
          <h1 className="text-subsubheading text-bluedark">Discount Coupons</h1>
          <div
            className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="text-xl text-gray-500" />
          </div>
        </div>
        <div className="relative table-container overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>Coupon ID</th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                  <div className="flex items-center">Created Date</div>
                </th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                  <div className="flex items-center">Purpose</div>
                </th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                  <div className="flex items-center">Discount Rate</div>
                </th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                  <div className="flex items-center">Validity</div>
                </th>
                <th scope="col" className="px-6 py-3 " style={{ minWidth: '150px' }}>
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
                  <td className="px-0 py-4 flex gap-0 justify-start">
                    <IconButton
                      color="success"
                      onClick={() => {
                        setCurrentCouponId(item.couponId);
                        setShowShareModal(true);
                      }}
                      disabled={item.validity !== "Pending"}
                    >
                      <IosShareIcon />
                    </IconButton>
                    <IconButton
                      color="default"
                      onClick={() => {
                        setEditCoupon(item);
                        setShowEditForm(true);
                      }}
                      disabled={item.validity !== "Pending"}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setCurrentCouponId(item.couponId);
                        setShowPopup(true);
                      }}
                      disabled={item.validity !== "Pending"}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="lg" className="flex items-center justify-center min-h-screen" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header className="text-center">Add New Coupon</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="purpose">Purpose</Label>
              <TextInput
                id="purpose"
                type="text"
                value={newCoupon.purpose}
                onChange={(e) => setNewCoupon({ ...newCoupon, purpose: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="discountRate">Discount Rate</Label>
              <div className="flex items-center">
                <TextInput
                  id="discountRate"
                  type="text"
                  value={newCoupon.discountRate.replace('%', '')}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountRate: e.target.value + '%' })}
                  className="w-full"
                />
                <span className="ml-2">%</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleAddCoupon}
          >
            Add Coupon
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditForm} onClose={() => setShowEditForm(false)} size="lg" className="flex items-center justify-center min-h-screen" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header className="text-center">Edit Coupon</Modal.Header>
        <Modal.Body>
          {editCoupon && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-full">
                <Label htmlFor="purpose">Purpose</Label>
                <TextInput
                  id="purpose"
                  type="text"
                  value={editCoupon.purpose}
                  onChange={(e) => setEditCoupon({ ...editCoupon, purpose: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="discountRate">Discount Rate</Label>
                <div className="flex items-center">
                  <TextInput
                    id="discountRate"
                    type="text"
                    value={editCoupon.discountRate.replace('%', '')}
                    onChange={(e) => setEditCoupon({ ...editCoupon, discountRate: e.target.value + '%' })}
                    className="w-full"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleEditCoupon}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPopup} onClose={() => setShowPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg",
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this coupon?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeleteCoupon}>
                Yes, I'm sure
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showShareModal} onClose={() => setShowShareModal(false)} size="xl" className="flex items-center justify-center min-h-screen"  >
        <Modal.Header className="text-center">Share Coupon</Modal.Header>
        <Modal.Body>
          <div className="relative table-container overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>Name</th>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '200px' }}>
                    <div className="flex items-center">Email</div>
                  </th>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                    <div className="flex items-center">Phone Number</div>
                  </th>
                  <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                    <div className="flex items-center">Score</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyUsers.map((user, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowShareModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageCoupons;