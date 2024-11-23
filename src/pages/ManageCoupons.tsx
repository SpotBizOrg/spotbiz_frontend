import { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { Button, Modal, TextInput, Label, Tooltip } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  IosShare as IosShareIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import SortByDropdown from "../components/SortBy";
import { BACKEND_URL } from "../../config";
import { useAuth } from "../utils/AuthProvider";
import { HashLoader } from "react-spinners";

interface Business {
  businessId: string;
  name: string;
  address: string;
  contactNo: string;
  status: string;
}

interface Customer {
  userId: string;
  email: string;
  name: string;
  phoneNo: string;
  role: string;
  status: string;
}

interface Leaderboard {
  userId: number;
  email: string;
  name: string;
  phoneNo: string;
  role: string;
  status: string;
  points: string;
}

interface Coupon {
  couponId: number;
  dateTime: string;
  description: string;
  discount: string;
  status: string;
  business: Business;
  customer: Customer;
}

interface AddCoupon {
  dateTime: string;
  description: string;
  discount: number | null;
}

function ManageCoupons() {
  useEffect(() => {
    document.title = "SpotBiz | Coupons | Admin";
    fetchAllCoupons(null, null);
    fetchTopCustomers();
    if (!checkAuthenticated() || user?.role != "ADMIN") {
      login();
    }
  }, []);

  const fetchAllCoupons = async (
    statusFilter: string | null,
    discountFilter: string | null
  ) => {
    try {
      const response = await fetch(`${BACKEND_URL}/coupon/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error("An unexpected error occurred");
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      const formattedCoupons = responseData.map(
        (coupon: {
          user?: {
            userId: string;
            email: string;
            name: string;
            phoneNo: string;
            role: string;
            status: string;
          };
          business?: {
            businessId: string;
            name: string;
            address: string;
            contactNo: string;
            status: string;
          };
          discount: number;
          status: string;
        }) => ({
          ...coupon,
          customer: coupon.user
            ? {
                userId: coupon.user.userId,
                email: coupon.user.email,
                name: coupon.user.name,
                phoneNo: coupon.user.phoneNo,
                role: coupon.user.role,
                status: coupon.user.status,
              }
            : {
                userId: "",
                name: "N/A",
                phoneNo: "",
                role: "",
                status: "",
              },
          business: coupon.business
            ? {
                businessId: coupon.business.businessId,
                name: coupon.business.name,
                address: coupon.business.address,
                contactNo: coupon.business.contactNo,
                status: coupon.business.status,
              }
            : {
                businessId: "",
                name: "N/A",
                address: "",
                contactNo: "",
                status: "",
              },
        })
      );

      const filteredCoupons = formattedCoupons.filter(
        (coupon: { status: string; discount: number }) => {
          const statusMatches = !statusFilter || coupon.status === statusFilter;

          let discountMatches = true;
          if (discountFilter) {
            const [min, max] = discountFilter.split("-").map(Number);
            discountMatches = coupon.discount >= min && coupon.discount <= max;
          }

          return statusMatches && discountMatches;
        }
      );

      setItems(filteredCoupons);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const fetchTopCustomers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/leaderboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error("An unexpected error occurred");
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      setLeaderboard(responseData);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const { user, checkAuthenticated, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Coupon[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showIssuePopup, setShowIssuePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState<number | null>(null);
  const [newCoupon, setNewCoupon] = useState<AddCoupon>({
    dateTime: "",
    description: "",
    discount: null,
  });
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [discountFilter, setDiscountFilter] = useState("");

  const handleAddCoupon = () => {
    if (newCoupon.description === "") {
      toast.error("Purpose could not be empty");
    } else if (newCoupon.discount === 0) {
      toast.error("Discount could not be zero");
    } else if (newCoupon.discount === null) {
      toast.error("Discount cannot be null");
    } else if (newCoupon.discount > 100) {
      toast.error("Discount cannot be greater than 100");
    } else {
      newCoupon.dateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      console.log(newCoupon);
      addCoupon();
    }
  };

  const handleIssueCoupon = async () => {
    setLoading(true);
    if (currentCouponId !== null && userId != null) {
      try {
        const response = await fetch(
          `${BACKEND_URL}/coupon/issue/${userId}/${currentCouponId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          toast.error("An unexpected error occurred");
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${
              errorData.message || "Unknown error"
            }`
          );
        }

        toast.success("Coupon issued successfully!");
        fetchAllCoupons(null, null);
        setShowIssuePopup(false);
        setShowShareModal(false);
        setCurrentCouponId(null);
        setUserId(null);
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const addCoupon = async () => {
    // setLoading(true);
    const dateTime = newCoupon.dateTime;
    const description = newCoupon.description;
    const discount = newCoupon.discount;
    try {
      const response = await fetch(`${BACKEND_URL}/coupon/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateTime,
          description,
          discount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error("An unexpected error occurred");
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      toast.success("Coupon added successfully!");
      resetNewCoupon();
      fetchAllCoupons(null, null);
      setShowForm(false);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetNewCoupon = () => {
    newCoupon.dateTime = "";
    newCoupon.description = "";
    newCoupon.discount = null;
  };

  const handleDeleteCoupon = async () => {
    try {
      // setLoading(true);
      const response = await fetch(
        `${BACKEND_URL}/coupon/delete/${currentCouponId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error("An unexpected error occurred");
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      toast.success("Coupon deleted successfully!");
      setShowPopup(false);
      fetchAllCoupons(null, null);
      setCurrentCouponId(null);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCoupon = async () => {
    // setLoading(true);
    const description = editCoupon?.description;
    const discount = editCoupon?.discount;

    if (description === "") {
      toast.error("Purpose could not be empty");
      return;
    } else if (Number(discount) === 0) {
      toast.error("Discount could not be zero");
      return;
    } else if (discount === null) {
      toast.error("Discount cannot be null");
      return;
    } else if (Number(discount) > 100) {
      toast.error("Discount cannot be greater than 100");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/coupon/update/${editCoupon?.couponId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            discount,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        console.error("Error response:", errorData.error);
        if (errorData.error === "Nothing Changed") {
          toast.error("Nothing Changed");
        }
        // throw new Error(
        //   `HTTP error! status: ${response.status}, message: ${
        //     errorData.message || "Unknown error"
        //   }`
        // );
      } else {
        const responseData = await response.json();
        console.log("Success:", responseData);
        toast.success("Coupon updated successfully!");
        resetNewCoupon();
        fetchAllCoupons(null, null);
        setShowEditForm(false);
        setEditCoupon(null);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Coupons" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-10">
          <h1 className="text-subsubheading text-bluedark">Discount Coupons</h1>
          <div className="flex gap-4">
            <div className="flex space-x-4 z-40">
              <SortByDropdown
                defaultTitle="Status"
                options={["PENDING", "ISSUED", "USED"]}
                onSelect={(value) => {
                  fetchAllCoupons(value, discountFilter);
                  setStatusFilter(value);
                }}
              />
              <SortByDropdown
                defaultTitle="Discount"
                options={[
                  "10-20",
                  "20-30",
                  "30-40",
                  "40-50",
                  "50-60",
                  "60-70",
                  "70-80",
                  "80-90",
                  "90-100",
                ]}
                onSelect={(value) => {
                  fetchAllCoupons(statusFilter, value);
                  setDiscountFilter(value);
                }}
              />
            </div>
            <div
              className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => setShowForm(true)}
            >
              <FaPlus className="text-xl text-gray-500" />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3"
                  style={{ minWidth: "100px" }}
                >
                  Coupon ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Created Date</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Purpose</div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Discount Rate</div>
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
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Customer</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Business</div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 "
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) => item.status !== "DELETED")
                .map((item) => (
                  <tr
                    key={item.couponId}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.couponId.toString()}
                    </th>
                    <td className="px-6 py-4">{item.dateTime}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-4 py-4">{item.discount}%</td>
                    <td className="px-6 py-4">{item.status}</td>
                    <td className="px-6 py-4">
                      {item.customer.name !== "N/A" ? (
                        <Tooltip
                          content={
                            <>
                              <p>
                                <strong>Name:</strong> {item.customer.name}
                              </p>
                              <p>
                                <strong>Phone No:</strong>{" "}
                                {item.customer.phoneNo}
                              </p>
                              <p>
                                <strong>Email:</strong> {item.customer.email}
                              </p>
                              <p>
                                <strong>Role:</strong> {item.customer.role}
                              </p>
                              <p>
                                <strong>Status:</strong> {item.customer.status}
                              </p>
                            </>
                          }
                          style="auto"
                          className="bg-gray-100 text-black"
                        >
                          <span className="cursor-pointer">
                            {item.customer.name}
                          </span>
                        </Tooltip>
                      ) : (
                        <span>{item.customer.name}</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {item.business.name !== "N/A" ? (
                        <Tooltip
                          content={
                            <>
                              <p>
                                <strong>Name:</strong> {item.business.name}
                              </p>
                              <p>
                                <strong>Address:</strong>{" "}
                                {item.business.address}
                              </p>
                              <p>
                                <strong>Contact No:</strong>{" "}
                                {item.business.contactNo}
                              </p>
                              <p>
                                <strong>Status:</strong> {item.business.status}
                              </p>
                            </>
                          }
                          style="auto"
                          className="bg-gray-100 text-black"
                        >
                          <span className="cursor-pointer">
                            {item.business.name}
                          </span>
                        </Tooltip>
                      ) : (
                        <span>{item.business.name}</span>
                      )}
                    </td>
                    <td className="px-0 py-4 flex gap-0 justify-start">
                      <IconButton
                        color="success"
                        onClick={() => {
                          setCurrentCouponId(item.couponId);
                          setShowShareModal(true);
                        }}
                        disabled={item.status !== "PENDING"}
                      >
                        <IosShareIcon />
                      </IconButton>
                      <IconButton
                        color="default"
                        onClick={() => {
                          setEditCoupon(item);
                          setShowEditForm(true);
                        }}
                        disabled={item.status !== "PENDING"}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setCurrentCouponId(item.couponId);
                          setShowPopup(true);
                        }}
                        disabled={item.status !== "PENDING"}
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

      <Modal
        show={showForm}
        onClose={() => setShowForm(false)}
        size="lg"
        className="flex items-center justify-center min-h-screen  z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="text-center">Add New Coupon</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="purpose">Purpose</Label>
              <TextInput
                id="purpose"
                type="text"
                value={newCoupon.description}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, description: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="discountRate">Discount Rate</Label>
              <div className="flex items-center">
                <TextInput
                  id="discountRate"
                  type="number"
                  value={newCoupon.discount ?? ""}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      discount: e.target.value
                        ? parseFloat(e.target.value)
                        : null,
                    })
                  }
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

      <Modal
        show={showEditForm}
        onClose={() => setShowEditForm(false)}
        size="lg"
        className="flex items-center justify-center min-h-screen  z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="text-center">Edit Coupon</Modal.Header>
        <Modal.Body>
          {editCoupon && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-full">
                <Label htmlFor="purpose">Purpose</Label>
                <TextInput
                  id="purpose"
                  type="text"
                  value={editCoupon.description}
                  onChange={(e) =>
                    setEditCoupon({
                      ...editCoupon,
                      description: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="discountRate">Discount Rate</Label>
                <div className="flex items-center">
                  <TextInput
                    id="discountRate"
                    type="text"
                    value={editCoupon.discount}
                    onChange={(e) =>
                      setEditCoupon({ ...editCoupon, discount: e.target.value })
                    }
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

      <Modal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        popup
        className="flex items-center justify-center inset-2/4 inset-y-1/2 z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to get this action?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteCoupon}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => setShowPopup(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showIssuePopup}
        onClose={() => setShowIssuePopup(false)}
        popup
        className="flex items-center justify-center inset-2/4 inset-y-1/2 z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to issue this coupon?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleIssueCoupon}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => setShowIssuePopup(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        size="xl"
        className="flex items-center justify-center min-h-screen z-40"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="text-center">Issue Coupon</Modal.Header>
        <Modal.Body>
          <div className="relative table-container overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "200px" }}
                  >
                    <div className="flex items-center">Email</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    <div className="flex items-center">Phone Number</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    <div className="flex items-center">Score</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "150px" }}
                  >
                    <div className="flex items-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phoneNo}</td>
                    <td className="px-6 py-4">{user.points}</td>
                    <td className="px-0 py-4 flex gap-0 justify-start ">
                      <Button
                        color="dark"
                        size="xs"
                        onClick={() => {
                          setShowIssuePopup(true);
                          setUserId(user.userId);
                        }}
                      >
                        Offer Coupon
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div className="px-12 sm:ml-64 mt-20">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default ManageCoupons;
